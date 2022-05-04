import Express from 'express';
const { Router } = require('express');
const con = require('./database');
const router = Router();
router.use(Express.json());
var admin = require('firebase-admin');
const axios = require('axios')
var serviceAccount = require("./vivi-2d40a-firebase-adminsdk-qtqoa-dbca668094.json");
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

router.post('/authlogin', (req, res) => {
    if (req.headers.cookie) {
        var sessionCookie = req.headers.cookie.replace("session=", "") || '';
    } else {
        var sessionCookie = '';
    }

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            con.query('SELECT * FROM khachhang WHERE idfirebase=? ', decodedClaims.user_id, function (err, rows) {
                if (err) throw err;
                if (rows.length > 0) {
                    axios
                        .post('http://localhost/apivivi/vivishop/login/token.php', {
                            idkh: rows[0].idkh,
                            idfirebase: rows[0].idfirebase
                        }).then((response) => {
                            res.send([rows, 2, response.data])
                          });
                } else {
                    res.send([decodedClaims.user_id, 1])
                }
            });

        })
        .catch((error) => {
            res.status(200).send(["Chưa đăng nhập", 0])
        });
})

module.exports = router

