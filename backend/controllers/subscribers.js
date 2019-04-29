const connection = require('../config.js');
const {auth} = require('./authorization');

module.exports = {
    subs: (req, res) => {
        const roll = req.session.roll || "abcd"
        let sql = `SELECT \`channels\` from \`subscribers\` WHERE \`roll\` = "${roll}"`
        connection.query(sql, (err, rows) => {
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'result' : 'success',
                        'data': rows.length>0?JSON.parse(rows[0].channels):''
                    })
                );
            } else {
                res.status(400).end();
            }
        });       
    },    
    update: (req, res) => {
        console.log(req.session)
        auth(req,res,function(err,data){
            if(err){
                res.status(400).end();
                return
            } else if(data==1){                
                const channels = req.body.channels
                const roll = req.session.roll
                const uid = req.session.uid
                let sql = `UPDATE \`subscribers\` SET \`channels\`='["${channels.join("\",\"")}"]' WHERE \`roll\`="${roll}" AND \`oid\` LIKE "%${uid}%"` 
                connection.query(sql, (err, rows) => {
                    if (!err) {
                        if(rows.affectedRows==1){
                            res.setHeader('Content-Type', 'application/json');
                            res.status(200).send(JSON.stringify(
                                {
                                    'result' : 'success',
                                    'code' : 200
                                })
                            );
                        }
                        else {                            
                            res.setHeader('Content-Type', 'application/json');
                            res.status(200).send(JSON.stringify(
                                {
                                    'result' : 'fail',
                                    'code' : 402
                                })
                            );
                        }
                    } else {
                        res.status(400).end();
                    }
                });
            }
            else{
                res.status(403).end();
                return
            }
        } ) 
    },
};