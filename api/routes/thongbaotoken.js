import Express from 'express';
const { Router } = require('express');
const con = require('./database');
const router = Router();
router.use(Express.json());
var admin = require('firebase-admin');
var serviceAccount = require("./vivi-2d40a-firebase-adminsdk-qtqoa-dbca668094.json");
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

router.post('/thongbaotoken', (req, res) => {
    if (req.headers.cookie) {
        var sessionCookie = req.headers.cookie.replace("session=", "") || '';
    }else{
        var sessionCookie = '';
    }
    
    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            con.query('SELECT * FROM thongbaotoken WHERE firebasethongbaotoken=? ', decodedClaims.user_id, function (err, rows) {
                if (err) throw err;
                if (rows.length > 0) {
                    let query = `UPDATE thongbaotoken SET tokenthongbaotoken = ? WHERE firebasethongbaotoken=?`;
                    con.query(query, [req.body.token, decodedClaims.user_id], function (err, rows) {
                        if (err) throw err;
                        res.send('1');
                    });
                }else{
                    let query = `INSERT INTO thongbaotoken (firebasethongbaotoken, tokenthongbaotoken) VALUES (?,?);`;
                    con.query(query, [decodedClaims.user_id, req.body.token], function (err, rows) {
                        if (err) throw err;
                        res.send('1');
                    });
                }
            });
            
        })
        .catch((error) => {
            res.status(200).send('0')
        });
})

module.exports = router

