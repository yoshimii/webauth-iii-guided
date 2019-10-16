const jwt = require('jsonwebtoken');

const secrets = require('../secrets/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
  jwt.verify(token, secret, (err, decodedToken) => {
    if(err) {
      //foul play
      res.status(401).json()
    }else {
      //token is goooood
      req.username = decodedToken.username;
      next();
    }
  });

  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
