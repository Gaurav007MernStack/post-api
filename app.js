const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
require('./config/db');
const bodyParser = require('body-parser');
//port
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }));
app.use('/api', require('./routes/user'))
app.use('/post', require('./routes/post'))
app.listen(port, () => {
  console.log(`Server is working at ${port}`)
})
