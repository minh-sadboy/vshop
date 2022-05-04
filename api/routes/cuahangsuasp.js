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

router.post('/cuahangsuasp', (req, res) => {
    if (req.headers.cookie) {
        var sessionCookie = req.headers.cookie.replace("session=", "") || '';
    } else {
        var sessionCookie = '';
    }

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            con.query('SELECT * FROM sanpham WHERE idshop=? AND idsp=? AND firebasesp = ?   ORDER BY idsp DESC', [req.body.idshop, req.body.idsp, decodedClaims.user_id], function (err, rows) {
                if (err) throw err;
                res.json(rows)
            });

        })
        .catch((error) => {
            res.status(200).send(["Chưa đăng nhập", 0])
        });
})

module.exports = router
