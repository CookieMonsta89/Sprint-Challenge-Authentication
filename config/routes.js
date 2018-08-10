const axios = require('axios');

const { authenticate, generateToken } = require('./middlewares');




const db = require('../database/dbConfig.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  const register = req.body;
    const hash = bcrypt.hashSync(register.password, 14);
    register.password = hash;
    if (!register.username || !register.password)
    res.status(400).json({errorMessage:"Required username and password"});
    db('users')
        .insert(register)
        .then(user => {
            const token = generateToken(user);
        
            res.status(201).json(token)
        })
        .catch(err => res.status(400).json({error: 'Error posting'}))
}

function login(req, res) {
  const credentials = req.body;

    db('users')
        .where({username: credentials.username })
        .first()
        .then(function(user) {
            if (user && bcrypt.compareSync(credentials.password, user.password)) {
                
                const token = generateToken(user);
                res.send(token);
            } else{ 
                return res.status(401).json({ error: 'Incorrect credentials' });
            }
        })
        .catch(function(error) {
            res.status(500).json({ error });
        })
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
