var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Abh1@bh1",
  database: "techtrek24"
});

var jwt = require("jsonwebtoken");

// exports.login = 
con.connect(function(err) {
                    if (err) throw err;
                    console.log("Connected!");
                });

// var usname = "johndoe"

exports.login = (req, res) => {
    con.query('select * from user where username = ?', [req.body.username], function (err, result) {
    if (err) throw err;
    console.log(result)
    // console.log("Result: " + result[0].first_name);
    if(!result.length){
        return res.status(404).send({message: "User Not Found."})
    }
    if(result[0].password != req.body.password){
        return res.status(401).send({accessToken:null, message: "Invalid Password."})
    }
    res.status(200).send({message: "Login Successful"})
});
}