const express = require('express');

const routes = require('./routes');

const app = express();

routes(app);

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log('Running on 4000');
});
