const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error'); // eslint-disable-line

function authorizationMiddleware(req, res, next) {
  const accesstoken = req.get('X-Access-Token');
  if (accesstoken === undefined) {
    throw new ClientError(401, 'authentication required');
  } else {
    const payload = jwt.verify(accesstoken, process.env.TOKEN_SECRET);
    req.user = payload;
    next();
  }
}
module.exports = authorizationMiddleware;
