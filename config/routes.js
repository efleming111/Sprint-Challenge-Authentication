const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const knexConfig = require('../database/dbConfig.js');
const { authenticate, generateToken } = require('../auth/authenticate');

const db = knexConfig;

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const user = req.body;
  if(user.username && user.password){
    user.password = bcrypt.hashSync(user.password);
    db('users')
    .insert(user)
    .then(ids=>{
      const token = generateToken(user.username);
      res.status(201).json({id: ids[0], token: token});
    })
    .catch(error=>{
      res.status(500).json({error: 'Failed to add user'});
    })
  }
  else{
    res.status(400).json({errorMessge: 'Please include a username and password'})
  }
}

function login(req, res) {
  // implement user login
  const user = req.body;
  if(user.username && user.password){
    db('users')
    .where('username', user.username)
    .then(users=>{
      if(users.length && bcrypt.compareSync(user.password, users[0].password)){
        const token = generateToken(user.username);
        res.json({username: user.username, token: token});
      }
      else{
        res.status(404).json({errorMessage: 'Invalid username or password'});
      }
    })
    .catch(error=>{
      register.status(500).json({error: 'Failed to find user'});
    })
  }
  else{
    res.status(400).json({errorMessage: 'Please include a valid username and/or password'});
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
