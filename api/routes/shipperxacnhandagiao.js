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

router.post('/shipperxacnhandagiao', (req, res) => {
    if (req.headers.cookie) {
        var sessionCookie = req.headers.cookie.replace("session=", "") || '';
    } else {
        var sessionCookie = '';
    }

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            let query = `UPDATE donhang SET trangthaidh = 3 WHERE madonhang = ?;
            UPDATE shiper SET tienthuhoship = ? WHERE firebaseship = ?;
            UPDATE shiper SET tienship = ? WHERE firebaseship = ?;
            UPDATE shop SET doanhthushop = ? WHERE idshop = ?;
            `;
            const tienshop = Number(req.body.tienthuho) - Number(req.body.tienship)
            con.query(query, [req.body.madonhang, req.body.tienthuho, decodedClaims.user_id, req.body.tienship, decodedClaims.user_id, tienshop, req.body.idshop], function (err, rows) {
                if (err) throw err;
                res.send('1');
            });
        })
        .catch((error) => {
            res.status(200).send(["Chưa đăng nhập", 0])
        });
})

module.exports = router

