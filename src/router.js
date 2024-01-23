const express = require('express');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET


const router = express.Router();

const mockUser = {
    username: 'authguy',
    password: 'mypassword',
    profile: {
        firstName: 'Chris',
        lastName: 'Wolstenholme',
        age: 43
    }
};

router.post('/login', (req, res) => {

    const createToken = (payload, secret)=>{
        const token = jwt.sign(payload, secret);
        return token;
    }

    const {username, password} = req.body
    if(username === mockUser.username && password === mockUser.password){
        const payload = {
            username: mockUser.username
        } 
        const generatedToken = createToken(payload, secret)
        res.json(generatedToken)
    }else{
        res.status(404).json({error: "credentials not match"})

    }

});


router.get('/profile', (req, res) => {

    const token = req.headers.authorization.split(' ');
  
    const actualToken = token[1];
  
    const verifyToken = (token, secret) => {
      
    const verifiedResult = jwt.verify(token, secret);

      return verifiedResult;
    }
  
    try {
      const result = verifyToken(actualToken, secret);
      res.status(201).json({ token: result });
    } 
    catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
  
  });
  

module.exports = router;
