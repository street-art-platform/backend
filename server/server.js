// packages
const express = require("express");
const body_parser = require("body-parser");

// custom
const login_hook = require("../handlers/login_hook");
const actionAuth = require("../middlewares/actionAuth");

const app = express();

const port = process.env.PORT || 3000;

app.use(body_parser.json({ limit: "10mb" }));

app.post("/login_hook",actionAuth, login_hook);
app.all('*', (req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Express server listening on ${port}`);
});
