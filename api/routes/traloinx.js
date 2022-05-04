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

router.post('/traloinx', (req, res) => {
    if (req.headers.cookie) {
        var sessionCookie = req.headers.cookie.replace("session=", "") || '';
    } else {
        var sessionCookie = '';
    }

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            con.query('SELECT trangthainx FROM nhanxet WHERE idnx = ? ', req.body.idnhanxet, function (err, rows) {
                if (err) throw err;
                if (rows[0].trangthainx == '0') {
                    let query = `INSERT INTO traloinhanxet (traloi, idnhanxet) VALUES (?,?);
                    UPDATE nhanxet SET trangthainx = 1 WHERE idnx = ?`;
                    con.query(query, [req.body.traloi, req.body.idnhanxet, req.body.idnhanxet], function (err, rows) {
                        if (err) throw err;
                        res.send('1');
                    });
                } else {
                    res.send('0')
                }
            });


        })
        .catch((error) => {
            res.status(200).send('0');
        });
})

module.exports = router

