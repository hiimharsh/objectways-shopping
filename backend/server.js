const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/', routes);

app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));