
function signup(req, client, callback){
    var reqJSON = req.body;
    var email = reqJSON['email'];
    var password = reqJSON['password'];
    var phone = reqJSON['phone'];
    // console.log(typeof(phone))
    var name = reqJSON['name'];
    // console.log(email,password,phone,name)
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const phoneregexp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if(!emailRegexp.test(email) || !phoneregexp.test(phone) || password == '' || name == '' || !isNaN(name)){
        callback({"success":false,"msg":'Please Enter All Details'});
    }
    else{
        var name_initials = name.match(/\b\w/g) || [];
        name_initials = 'u_' + ((name_initials.shift() || '') + (name_initials.pop() || '')).toUpperCase() + phone;
        var sql = 'insert into `users` (`user_id`,`user_name`,`email`,`password`,`superAdminId`,`phone`) values ("' + name_initials + '","' + name + '","' + email + '","' + password + '","' + name_initials + '","' + phone + '");'
        // console.log(sql)
        client.query(sql,function(error,rows,fields){
            if(error){
                // console.log(error)
                callback({"success":false});
            }
            else{
                // console.log("successfully added school")
                // console.log(rows,fields);
                callback({"success":true});
            }
        })
    }
}

function login(req, client, callback){
    var reqJSON = req.body;
    var email = reqJSON['email'];
    var password = reqJSON['password'];
    var sql = 'SELECT * FROM users WHERE email = "' + email + '";';
    console.log(sql)
    client.query(sql, function (error, results, fields) {
        if (error) {
          // console.log("error ocurred",error);
          callback({
            "code":400,
            "failed":"error ocurred"
          })
        }
        else{
          // console.log('The solution is: ', results);
            if(results.length >0){
                if(results[0].password == password){
                    callback({
                    "code":200,
                    "success":true
                    });
                }
                else{
                    callback({
                        "code":204,
                        "success":false
                        });
                }
            }
            else{
                callback({
                    "code":204,
                    "success":false
                });
            }
        }
    });
}

// user_id varchar(20) NOT NULL,
//     user_name varchar(200) NOT NULL,
//     phone  varchar(20),
//     email varchar(50),
//     password varchar(50)
//     superAdminId varchar(20) NOT NULL

function insertschool(req, client, callback){
    var reqJSON = req.body;
    var name = reqJSON['school_name'];
    var initials = name.match(/\b\w/g) || [];
    initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    // district varchar(200) NOT NULL,
    // ->     state varchar(200) NOT NULL,
    // ->     address
    var sql = 'insert into `school` (`school_id`,`school_name`,`district`,`state`,`address`) values ("s_' + initials + '","' + reqJSON['school_name'] + '","' + reqJSON['district'] + '","' + reqJSON['state'] + '","' + reqJSON['address'] + '");'
    // console.log(sql)
    client.query(sql,function(error,rows,fields){
        if(error){
            // console.log(error)
            callback({"success":false});
        }
        else{
            // console.log("successfully added school")
            // console.log(rows,fields);
            callback({"success":true});
        }
    })
}

function getschools(req, client, callback){
    var reqJSON = req.body;
    sql = 'select *  from `school`;'
    console.log(sql)
    client.query(sql,function(error,rows,fields){
        if(error){
            // console.log(error)
            callback({"success":false});
        }
        else{
            // console.log("successfully added school")
            // console.log(rows,fields);
            callback({"success":true,"data":rows});
        }
    })
}

function getSchoolDetails(){

}

function insertclass(req, client, callback){
    var reqJSON = req.body;
    var sql = 'insert into `class` (`school_id`,`class_name`,`strength`) values (' + reqJSON['school_id'] + ',"' + reqJSON['class_name'] + '",' + reqJSON['strength'] + ');'
    con/sole.log(sql)
    client.query(sql,function(error,rows,fields){
        if(error){
            // console.log(error)
            callback({"success":false});
        }
        else{
            // console.log("successfully added class")
            // console.log(rows,fields);
            callback({"success":true});
        }
    })
}

function updateclass(req, client, callback){
    var reqJSON = req.body;
    // UPDATE `table_name` SET `column_name` = `new_value' [WHERE condition];
    // console.log(reqJSON['school_name'])
    var sql = 'update `class` set `strength` = ' + reqJSON['strength'] + ' where `school_id` = ' + reqJSON['school_id'] + ' and `class_name` =  "' + reqJSON['class_name'] + '";';
    // console.log(sql)
    client.query(sql,function(error,rows,fields){
        if(error){
            // console.log(error)
            callback({"success":false});
        }
        else{
            // console.log("successfully added school")
            // console.log(rows,fields);
            callback({"success":true});
        }
    })
}

function insertitem(req, client, callback){
    var reqJSON = req.body;
    // console.log(reqJSON['school_name'])
    var sql = 'insert into `items` (`item_name`,`item_type`) values ("' + reqJSON['item_name'] + '","' + reqJSON['item_type'] + '");'
    // console.log(sql)
    client.query(sql,function(error,rows,fields){
        if(error){
            console.log(error)
            callback({"success":false});
        }
        else{
            console.log("successfully added school")
            console.log(rows,fields);
            callback({"success":true});
        }
    })
}


function updateitemstock(req, client, callback){
    var reqJSON = req.body;
    // UPDATE `table_name` SET `column_name` = `new_value' [WHERE condition];
    // console.log(reqJSON['school_name'])
    var sql = 'update `items` set `available_stock` = ' + reqJSON['available_stock'] + ' where `item_id` = ' + reqJSON['item_id'] ;
    // console.log(sql)
    client.query(sql,function(error,rows,fields){
        if(error){
            // console.log(error)
            callback({"success":false});
        }
        else{
            // console.log("successfully added school")
            // console.log(rows,fields);
            callback({"success":true});
        }
    })
}

function insertorder(req, client, callback){
    var reqJSON = req.body;
    // console.log(reqJSON['school_name'])
    var sql = 'insert into `item_order` (`item_id`,`class_id`,`demanded`) values (' + reqJSON['item_id'] + ',' + reqJSON['class_id'] + ',' + reqJSON['demanded'] + ');'
    console.log(sql)
    client.query(sql,function(error,rows,fields){
        if(error){
            console.log(error)
            callback({"success":false});
        }
        else{
            console.log("successfully added school")
            console.log(rows,fields);
            callback({"success":true});
        }
    })
}

function generateorder(req, client, callback){
    var reqJSON = req.body;
    // console.log(reqJSON)
    var sql = ' select * from `item_order` INNER JOIN `items` on item_order.item_id = items.item_id INNER JOIN `class` on item_order.class_id = class.class_id where items.item_type ="' + reqJSON['type'] + '"';
    // console.log(sql)
    client.query(sql,function(error,rows,fields){
        if(error){
            // console.log(error)
            callback({"success":false});
        }
        else{
            // console.log("successfully added school")
            // console.log(rows);
            let data = []
            for (let i in rows){
                if((rows[i]['demanded'] * rows[i]['strength']) - rows[i]['available_stock'] > 0){
                    rows[i]['tobeordered'] = (rows[i]['demanded'] * rows[i]['strength']) - rows[i]['available_stock'];
                    data.push(rows[i]);
                }
            }
            // console.log(data);
            callback({"data":data});
        }
    })
}


module.exports.insertschool = insertschool;
module.exports.insertclass = insertclass;
module.exports.insertitem = insertitem
module.exports.updateitemstock = updateitemstock;
module.exports.updateclass = updateclass;
module.exports.insertorder = insertorder;
module.exports.generateorder = generateorder;
module.exports.getschools = getschools;
module.exports.signup = signup;
module.exports.login = login;
module.exports.getSchoolDetails = getSchoolDetails;