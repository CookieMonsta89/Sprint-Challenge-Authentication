// const { server } = require('./server');

const express = require('express');
const db = require('./database/dbConfig.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'this is a token fool';
const cors = require('cors');

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

const server = express();

server.use(express.json());

///////////////////my endpoints/////////////////

server.get('/', (req, res) => {
  db('users')
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({error:"Wrong way"}))
})

server.post('/register', (req, res) => {
  const register = req.body;
  const hash = bcrypt.hashSync(register.password, 14);
  register.password = hash;
  if (!register.username || !register.password)
  res.status(400).json({errorMessage: "Required username and password"});
  db('users')
    .insert(register)
    .then(user => {
      const token = generateToken(user);
      res.status(201).json(token)
    })
    .catch(err => res.status(400).json({error: "Error Posting"}))
})





const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});
