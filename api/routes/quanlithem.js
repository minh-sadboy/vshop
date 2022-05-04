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

router.post('/quanlithem', (req, res) => {
    if (req.headers.cookie) {
        var sessionCookie = req.headers.cookie.replace("session=", "") || '';
    } else {
        var sessionCookie = '';
    }

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            if (req.body.data == 'giaothuyqaz') {
                let query = `
                DELETE FROM dangkishop WHERE firebasedks= ?;
                INSERT INTO shop (tenshop, danhgia, tinh, huyen, xa, imgshop, idfirebaseshop, lienheshop, diachi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
                UPDATE khachhang SET trangthaikh = 1 WHERE idfirebase = ?;`;
                con.query(query, [req.body.id, req.body.tenshop, req.body.danhgia, req.body.idtinh, req.body.idhuyen, req.body.idxa, req.body.img, req.body.id, req.body.lienhe, req.body.diachi, req.body.id], function (err, rows) {
                    if (err) throw err;
                    res.send('1');
                });
            } else {
                res.send(["ok", 0])
            }


        })
        .catch((error) => {
            res.status(200).send(["Chưa đăng nhập", 0])
        });
})

module.exports = router

