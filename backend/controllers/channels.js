const connection = require('../config.js');

module.exports = {
    all: (req, res) => { 
        // res.status(200).send(JSON.stringify(req))
        console.log(req.cookies)
        const key = req.params.q
        let sql = key===undefined?'SELECT * from channels':`SELECT * FROM \`channels\` where CONCAT(slug, ' ', name) LIKE "%${key.trim()}%"`
        connection.query(sql, (err, rows) => {
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'result' : 'success',
                        'data': rows
                    })
                );
            } else {
                res.status(400).send(err);
            }
        });
    },
    search: (req, res) => {
        const key = req.body.q      
        let sql = key===undefined?'SELECT * from channels':`SELECT * FROM \`channels\` where CONCAT(slug, ' ', name) LIKE "%${key.trim()}%"`
        connection.query(sql, (err, rows) => {
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'result' : 'success',
                        'data': rows
                    })
                );
            } else {
                res.status(400).send(err);
            }
        });
    },
    slug: (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        const key = req.body.q     
        if (
            typeof key !== 'undefined'
        ){
            let sql = `SELECT COUNT(*) as cnt FROM \`channels\` WHERE slug = "${key.toLowerCase() }"`
            connection.query(sql, (err, rows) => {
                if (!err) {                    
                    res.status(200).send(JSON.stringify(
                        {
                            'result' : 'success',
                            'available': rows[0].cnt==0?true:false
                        })
                    );
                    } else {
                        res.status(400).send(err);
                    }
                }
            );
        }
        else {
            res.status(200).send(                        {
                'result' : 'fail',
                'error': "Enter proper slug name" 
            });
        }
    },
    create: (req, res, next) => {
        let response;
        const name = req.body.name;
        const slug = req.body.slug.toLowerCase();
        if (
            typeof name !== 'undefined'
            && typeof slug !== 'undefined'
        ) {
            connection.query('INSERT INTO channels (name, slug) VALUES (?, ?)',
                [name, slug],
                (err, result) => {
                    handleSuccessOrErrorMessage(err, result, res);
                });

        } else {
            response = {
                'result' : 'error',
                'msg' : 'Please fill required details'
            };
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        }
    },

    get: (req, res) => {
        connection.query('SELECT * from channels where slug = ?', [req.params.slug], (err, rows) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(
                {
                    'result' : 'success',
                    'data': rows[0]
                })
            );
        })
    },

    update: (req, res) => {
        let response;
        const name = req.body.name;
        const slug = req.params.slug;
        if (
            typeof name !== 'undefined'
            && typeof slug !== 'undefined'
        ) {
            connection.query('UPDATE channels SET name = ? WHERE slug = ?',
                [name, slug],
                function(err, result) {
                    handleSuccessOrErrorMessage(err, result, res);
                });
        } else {
            response = {'result' : name, 'msg' : 'Please fill required information'};
            res.setHeader('Content-Type', 'application/json');
            res.send(200, JSON.stringify(response));
        }
    },

    destroy: (req, res) => {
        connection.query('DELETE FROM channels WHERE slug = ?', [req.params.slug], (err, result) => {
            handleSuccessOrErrorMessage(err, result, res);
        });
    }
};

function handleSuccessOrErrorMessage(err, result, res) {
    if (!err){
        let response;
        if (result.affectedRows != 0) {
            response = {'result' : 'success'};
        } else {
            response = {'msg' : 'No Result Found'};
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(response));
    } else {
        res.status(400).send(err);
    }
}