const db = require('../db')
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET_KEY

// Function to hash a password using bcrypt
const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  };

exports.login = (req, res) => {
    console.log(req.body)
    db.query('select * from user where username = ?', [req.body.username], function (err, result) {
    if (err) throw err;
    console.log(result)
    if(!result.length){
        return res.status(404).send({accessToken:null, message: "User Not Found."})
    }
    if(!bcrypt.compareSync(req.body.password, result[0].password)){
        return res.status(401).send({accessToken:null, message: "Invalid Password."})
    }
    const token = jwt.sign({user_id: result[0].id , username: result[0].username}, SECRET_KEY, {expiresIn: '1h'})
    console.log(token)
    res.status(200).send({accessToken: token, message: "Login Successful"})
});
}

exports.register = (req, res, next) => {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const password = req.body.password
    const username = req.body.username

    try {
        // Check if the username already exists
        const checkUsernameQuery = 'SELECT * FROM user WHERE username = ?';
        const checkUsernameValues = [username];
    
        db.query(checkUsernameQuery, checkUsernameValues, async (checkError, checkResults) => {
          if (checkError) {
            console.error('Error checking username:', checkError);
            return res.status(500).json({ error: 'Error checking username' });
          }
    
          if (checkResults.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
          }
    
          const hashedPassword = await hashPassword(password);
    
          const insertQuery = 'INSERT INTO user (first_name, last_name, username, password) VALUES (?,?,?,?)';
          const insertValues = [first_name, last_name, username, hashedPassword];
    
          db.query(insertQuery, insertValues, (insertError, insertResults) => {
            if (insertError) {
              console.error('Error creating new user:', insertError);
              res.status(500).json({ error: 'Error creating new user' });
            } else {
              console.log('New user created:', insertResults);
              res.status(201).json({ message: 'User created successfully' });
            }
          });
        });
      } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ error: 'Error creating new user' });
      }
};

exports.verifytoken = (req, res, next) =>{
    const token = req.headers.auth;
    if(!token){
        return res.status(401).json({ message: 'Unauthorized - Token not provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
        console.log(decoded)
        req.user_id = decoded.user_id;
        next();
      });
};