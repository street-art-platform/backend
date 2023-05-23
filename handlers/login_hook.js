"use strict";
const gql = require("graphql-tag");
const apollo_client = require("../config/apollo");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  try {
    const { privateKey } = JSON.parse(process.env.AUTH_SERVER_SECRET);
    console.log("private key", privateKey, req.body.input.objects);
    let { objects } = req.body.input;
    console.log("haha", objects);

    //Login in to the authorizer
    let login_gql = gql`
      mutation ($credential: LoginInput!) {
        login(params: $credential) {
          access_token
          expires_in
          id_token
          message
          refresh_token
          should_show_otp_screen
          user {
            family_name
            birthdate
            email
            created_at
            email_verified
            gender
            given_name
            id
            is_multi_factor_auth_enabled
            middle_name
            nickname
            phone_number
            phone_number_verified
            picture
            preferred_username
            revoked_timestamp
            roles
            signup_methods
            updated_at
          }
        }
      }
    `;

    // console.log("login gql", login_gql);

    let { data } = await apollo_client.mutate({
      mutation: login_gql,
      variables: {
        credential: {
          password: objects.password,
          email: objects.email,
        },
      },
    });
    // console.log("data", data);
    let user = data && data.login && data.login.user && data.login.user;
    let at = data && data.login && data.login.access_token;
    let ev = user.email_verified;
    let uId = user.id;

    if (!at) throw new Error("Login failed");

    if (!ev)
      throw new Error("Email is not Confirmed. Please Confirm your email");

    //TODO: Add to users in main schema
    const cGql = gql`
      mutation ($userData: users_insert_input!) {
        copy: insert_users_one(
          object: $userData
          on_conflict: { constraint: users_email_key, update_columns: [role] }
        ) {
          id
        }
      }
    `;

    let respObj = await apollo_client.mutate({
      mutation: cGql,
      variables: {
        userData: {
          email: user.email,
          gender: user.gender,
          first_name: user.given_name,
          last_name: user.family_name,
          birth_date: user.birthdate,
          role: user.roles[0],
          phone: user.phone_number,
        },
      },
    });

    let muId = respObj.data && respObj.data.copy && respObj.data.copy.id;

    let payload = {
      sub: muId,
      iat: Math.floor(Date.now() / 1000),
      metadata: {
        roles: ["user", "artist", "tourist", "admin"],
        "x-hasura-user-id": muId,
        "x-hasura-default-role": "user",
        "x-hasura-role": user.roles[0],
      },
    };

    let token = jwt.sign(payload, privateKey, { algorithm: "RS256" });

    return res.send({
      userRemId: uId,
      userId: muId,
      authToken: at,
      accessToken: token,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
