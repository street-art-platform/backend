"use strict";
const gql = require("graphql-tag");
const apollo_client = require("../config/apollo");

module.exports = async (req, res) => {
  const { privateKey } = JSON.parse(process.env.AUTH_SERVER_SECRET);
  console.log("private key", privateKey, req.body.input.objects);
  let { objects } = req.body.input;

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
  let { data } = await apollo_client.mutate({
    mutation: login_gql,
    variables: {
      credential: {
        password: objects.password,
        email: objects.email,
      },
    },
  });

  console.log(data.login.user);

  if (!data.login.access_token) throw new Error("Login failed");

  if (!data.login.user.email_verified)
    throw new Error("Email is not Confirmed. Please Confirm your email");

  //TODO: Add to users in main schema
  // payload = {
  //   sub: data.intern[0].intern_id,
  //   aud: "Street Art Platform",
  //   iat: Math.floor(Date.now() / 1000),
  //   "metadata": {
  //     "roles": ["user"],
  //   },
  // };

  return res.send({
    userId: "trial id",
    authToken: "token",
    accessToken: "access token",
  });
};
