const connection = require('../config.js');

module.exports = {
    auth: (req,res,callback) => {
        roll = req.session.roll || ""
        uid  = req.session.uid || ""
        let sql = `SELECT COUNT(*) as cnt FROM \`subscribers\` WHERE roll = "${roll}" AND oid LIKE "%${uid}%"`
        connection.query(sql, (err, rows) => {    
            if (err) 
                callback(err,null);
            else
                callback(null,rows[0].cnt);
            }
        )
    },
    signup: (req, res) => {
        let response;
        const cookieRoll = Buffer.from(req.cookies.identifier||' ', 'base64').toString()
        const roll = req.body.roll;
        const uid = req.body.uid;
        if(cookieRoll.length<5 || roll!=cookieRoll){
            response = {'result' : 403, 'msg' : 'Token invaid'};
            res.setHeader('Content-Type', 'application/json');
            res.status(403).send(JSON.stringify(response));   
            return;        
        }
        if (
            typeof roll !== 'undefined'
            && typeof uid !== 'undefined'
            && roll.length==12
            && uid.length > 2
        ) {
            connection.query(`SELECT roll from \`subscribers\` WHERE oid LIKE "%${uid}%"`,    
                function(err, result) {
                    if (err) throw err;
                    if(result.length==1){
                        if((result[0].roll===roll) && (roll===cookieRoll)){
                            response = {'result' : 200, 'msg' : 'Device already registered'};
                            res.setHeader('Content-Type', 'application/json');
                            res.status(200).send(JSON.stringify(response));   
                            return;   
                        }
                        else{
                            response = {'result' : 403, 'msg' : 'Token invaid'};
                            res.setHeader('Content-Type', 'application/json');
                            res.status(403).send(JSON.stringify(response));   
                            return;    
                        }  
                    } 
                    else if(result.length==0){
                        connection.query(`SELECT roll from \`subscribers\` WHERE roll = "${roll}"`,function(err,result){
                                if(result.length==0){              
                                    let sql = `INSERT INTO subscribers (roll, oid) VALUES (?, '${JSON.stringify([uid])}' )`     
                                    connection.query(sql,[roll],
                                        (err, result) => {
                                            handleSuccessOrErrorMessage(err, result, res);
                                            req.session.roll = roll
                                            req.session.uid = uid
                                    });
                                }
                                else if(result.length==1){
                                    let sql = `UPDATE subscribers SET oid = JSON_ARRAY_APPEND (oid, '$', ?) WHERE roll = ?;`          
                                    connection.query(sql,[uid,roll],
                                        (err, result) => {
                                            handleSuccessOrErrorMessage(err, result, res);
                                    });
                                }                                
                                else{
                                    response = {'result' : 400, 'msg' : 'Err 201: Contact Admin'};
                                    res.setHeader('Content-Type', 'application/json');
                                    res.status(400).send(JSON.stringify(response));   
                                    return;   
                                }
                            }
                        )                        

                        return;   
                    }
                    else {
                        response = {'result' : 400, 'msg' : 'Err 202: Contact Admin'};
                        res.setHeader('Content-Type', 'application/json');
                        res.status(400).send(JSON.stringify(response));   
                        return;   
                    }
                });
        } else {
            response = {'result' : 400, 'msg' : 'Please fill required information'};
            res.setHeader('Content-Type', 'application/json');
            res.send(400, JSON.stringify(response));
        }
    },

    login: (req,res) => {
        roll = req.body.roll || ""
        uid  = req.body.uid || ""
        let sql = `SELECT COUNT(*) as cnt FROM \`subscribers\` WHERE roll = "${roll}" AND oid LIKE "%${uid}%"`
        
        connection.query(sql, (err, rows) => {
                if (!err) {
                    if(rows[0].cnt==1){
                        req.session.roll = roll
                        req.session.uid = uid
                        res.status(200).send(JSON.stringify(
                            {
                                'result' : 200,
                                'msg': "Login successful"
                            })
                        );                        
                    }
                    else if(rows[0].cnt==0){
                        module.exports.signup(req,res)                      
                    }
                    else{
                        res.status(403).send(JSON.stringify(
                            {
                                'result' : 403,
                                'msg': "unauthorized token"
                            })
                        );                        
                    }              
                    return rows[0].cnt==1?true:false;
                }
            }
        )
    }
};

function handleSuccessOrErrorMessage(err, result, res) {
    if (!err){
        let response;
        if (result.affectedRows != 0) {
            response = {'result' : 200};

        } else {
            response = {'result' : 400, 'msg' : 'No Result Found'};
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(response));
    } else {
        res.status(400).send(err);
    }
}