const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const connect_db = require('./connect/db');
connect_db();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello Express !");
});

app.listen(port, () => console.log(`Server listening on ${port}`));
