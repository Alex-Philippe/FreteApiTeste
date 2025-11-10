const express = require('express');
const cors = require('cors');
const app = express();
const authRoute = require("./routes/auth.routes")
const freteRoute = require("./routes/frete.routes")
const dotenv = require('dotenv');
const ApiUrl = '/frete/';

dotenv.config();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(ApiUrl,authRoute)
app.use(ApiUrl,freteRoute)
module.exports = app;
