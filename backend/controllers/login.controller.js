const db = require('../db')
var jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET_KEY

exports.login = (req, res) => {
    console.log(req.body)
    db.query('select * from user where username = ?', [req.body.username], function (err, result) {
    if (err) throw err;
    console.log(result)
    if(!result.length){
        return res.status(404).send({message: "User Not Found."})
    }
    if(result[0].password != req.body.password){
        return res.status(401).send({accessToken:null, message: "Invalid Password."})
    }
    const token = jwt.sign({user_id: result[0].id , username: result[0].username}, SECRET_KEY, {expiresIn: '1h'})
    console.log(token)
    res.status(200).send({jwttoken: token, message: "Login Successful"})
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