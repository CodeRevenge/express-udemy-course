const jwt = require('jsonwebtoken');

const isValidHostname = (req, res, next) => {
  const validHosts = ['localhost'];
  if (validHosts.includes(req.hostname)) {
    next();
  } else {
    res.status(403).send({ status: 'ACCESS_DENIED' });
  }
};

const isAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token) {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.sessionData = { userId: data.userId };
      next();
    } else {
      // eslint-disable-next-line no-throw-literal
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'Missing header token.'
      };
    }
  } catch (e) {
    res
      .status(e.code || 500)
      .send({ status: e.status || 'ERROR', message: e.message });
  }
};

module.exports = { isValidHostname, isAuth };
