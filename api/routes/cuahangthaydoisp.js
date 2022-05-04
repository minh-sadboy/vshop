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

router.post('/cuahangthaydoisp', (req, res) => {
    if (req.headers.cookie) {
        var sessionCookie = req.headers.cookie.replace("session=", "") || '';
    } else {
        var sessionCookie = '';
    }

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            let query = `UPDATE sanpham SET thongtin = ? WHERE idsp = ? AND firebasesp = ?;
            UPDATE sanpham SET gia = ? WHERE idsp = ? AND firebasesp = ?;
            UPDATE sanpham SET giamgia = ? WHERE idsp = ? AND firebasesp = ?;
            UPDATE sanpham SET trangthaisp = ? WHERE idsp = ? AND firebasesp = ?;
            UPDATE sanpham SET ten = ? WHERE idsp = ? AND firebasesp = ?;
            UPDATE sanpham SET cannangsp = ? WHERE idsp = ? AND firebasesp = ?;
            `;
            con.query(query, [req.body.thongtin, req.body.idsp, decodedClaims.user_id, req.body.gia, req.body.idsp, decodedClaims.user_id, req.body.giamgia, req.body.idsp, decodedClaims.user_id, req.body.trangthaisp, req.body.idsp, decodedClaims.user_id, req.body.ten, req.body.idsp, decodedClaims.user_id, req.body.cannang, req.body.idsp, decodedClaims.user_id], function (err, rows) {
                if (err) throw err;
                res.send('1');
            });

        })
        .catch((error) => {
            res.status(200).send(["Chưa đăng nhập", 0])
            console.log(error)
        });
})

module.exports = router

