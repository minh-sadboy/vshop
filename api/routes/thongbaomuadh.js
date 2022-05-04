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

router.post('/thongbaomuadh', (req, res) => {
    if (req.headers.cookie) {
        var sessionCookie = req.headers.cookie.replace("session=", "") || '';
    } else {
        var sessionCookie = '';
    }
    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            con.query('SELECT idfirebaseshop FROM shop WHERE idshop = ?', req.body.idshop, function (err, rows) {
                if (err) throw err;
                con.query('SELECT tokenthongbaotoken FROM thongbaotoken WHERE firebasethongbaotoken = ?', rows[0].idfirebaseshop, function (err, rows1) {
                    if (err) throw err;
                    const registrationToken = rows1[0].tokenthongbaotoken;
                    const message = {
                        notification: {
                            title: 'Đơn hàng mới',
                            body: 'Bạn có đơn hàng mới. Giá đơn hàng: ' + req.body.giadh,
                        },
                        token: registrationToken
                    };
                    admin.messaging().send(message)
                        .then((response) => {
                            res.send("1");
                        })
                        .catch((error) => {
                            res.status(200).send(["Chưa đăng nhập", 0])
                        });
                });
            });
        })
        .catch((error) => {
            res.status(200).send(["Chưa đăng nhập", 0])
        });
})

module.exports = router

