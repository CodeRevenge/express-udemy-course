const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const routesV1 = require('./routes/v1');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

routesV1(app);

const { PORT } = process.env || 4000;

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Conected to MongoDB.');
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('MongoDB error. ', error);
  });
