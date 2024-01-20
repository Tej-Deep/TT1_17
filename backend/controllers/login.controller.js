const db = require('../db')
const bcrypt = require('bcrypt');
var jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET_KEY

const checkPassword = async (inputPassword, hashedPassword) => {
    return bcrypt.compare(inputPassword, hashedPassword);
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