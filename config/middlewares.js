const jwt = require('jsonwebtoken');

const jwtKey = require('../_secrets/keys').jwtKey;

const secret = 'this is a token fool';

const cors = require('cors');

// quickly see what this file exports
module.exports = {
  authenticate,
  protected,
  generateToken
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(422).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}


function protected(req, res, next) {
  const token = req.headers.authorization;
  if(token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res  
          .status(401)
          .json({error: 'You shall not pass-token invalid'});
      }
      req.jwtToken = decodedToken;
      next();
    });
  } else {
      return res.status(401).json({error:'You shall not pass-no token'});
  }
}


function generateToken(user) {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '1h',
    jwtid:'8728391'
  };
  return jwt.sign(payload, secret, options);
}