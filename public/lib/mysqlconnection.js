var mysql = require('mysql');

function sqlClient(){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database:"sparsh"
    });
    
    con.connect(function(err) {
        if (err){
            console.log(err);
        }
        console.log("Connected!");
    });
    return con
}


module.exports.sqlClient = sqlClient