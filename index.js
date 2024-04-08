const express = require("express");
require("dotenv").config();
const initRoute = require("./app");
require('./src/database/connection-data')
// const cors = require("cors")
import cors from 'cors'


const app = express();
const port = process.env.APP_PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


initRoute(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
