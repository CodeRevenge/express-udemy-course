const { countries, languages } = require('countries-list');

const routes = (app) => {
  app.get('/', (request, response) => {
    response.status(200).send('Hello');
  });

  app.get('/info', (request, response) => {
    response.send('info nodemon 2');
  });

  app.get('/country', (request, response) => {
    // console.log(request.query);
    response.json(countries[request.query.code]);
  });

  app.get('/languages/:lang', (request, response) => {
    const lang = languages[request.params.lang];
    if (lang) {
      response.json({ status: 'OK', data: lang });
    } else {
      response.status(404).json({
        status: 'NOT_FOUND',
        message: `language ${request.params.lang} not found`
      });
    }
  });

  app.get('*', (request, response) => {
    response.status(404).send('Not Found!');
  });
};

module.exports = routes;
