# Street Art Platform API

This guide provides instructions for setting up the Street Art Platform API. Before starting, please ensure that you have the following prerequisites installed:

- Docker
- Postgres Database
- Hasura CLI (optional)

## Setup

1. Create two databases named "graph_db" and "auth_db" and give password for your user and change the ".env" file DB connection urls.

2. Run the command "docker compose up --build".

3. Change your directory to the "graph" folder and run these commands:
      ```
      hasura metadata apply
      hasura migrate apply --database-name default
      hasura metadata reload
      ```

Congratulations! You have now successfully installed the Street Art Platform API. You can now use it to manage street art content.
