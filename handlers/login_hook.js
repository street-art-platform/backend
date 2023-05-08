"use strict";
const gql = require("graphql-tag");
const apollo_client = require("../config/apollo");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
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

  console.log("login gql", login_gql);

  let { data } = await apollo_client.mutate({
    mutation: login_gql,
    variables: {
      credential: {
        password: objects.password,
        email: objects.email,
      },
    },
  });
  console.log("data", data);
  let user = data && data.login && data.login.user && data.login.user;
  let at = data && data.login && data.login.access_token;
  let ev = user.email_verified;
  let uId = user.id;

  if (!at) throw new Error("Login failed");

  if (!ev) throw new Error("Email is not Confirmed. Please Confirm your email");

  //TODO: Add to users in main schema
  const cGql = gql`
    mutation ($userData: users_insert_input!) {
      copy: insert_users_one(
        object: $userData
        on_conflict: { constraint: users_email_key, update_columns: [] }
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
        age: 18,
        gender: user.gender,
        name: `${user.family_name || ""} ${user.middle_name || ""} ${
          user.given_name || ""
        }`,
      },
    },
  });

  let payload = {
    sub: uId,
    iat: Math.floor(Date.now() / 1000),
    metadata: {
      roles: ["user"],
      "x-hasura-user-id": uId,
      "x-hasura-default-role": "user",
    },
  };

  let token = jwt.sign(payload, privateKey, { algorithm: "RS256" });

  return res.send({
    userId: uId,
    authToken: at,
    accessToken: token,
  });
};
