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

router.post('/danhgia', (req, res) => {
    if (req.headers.cookie) {
        var sessionCookie = req.headers.cookie.replace("session=", "") || '';
    } else {
        var sessionCookie = '';
    }

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            let query = `SELECT idkhdh, datadonhang FROM donhang WHERE madonhang = ? AND idfirebasedh=? AND trangthaidh = 3`;
            let madonhang = req.body.madonhang;
            con.query(query, [madonhang,decodedClaims.user_id], function (err, rows) {
                if (err) throw err;
                if (rows.length > 0) {
                    res.send([rows, 2])
                }else{
                    res.send(["Chưa có đơn hàng",1])
                }
            });

        })
        .catch((error) => {
            res.status(200).send(["Chưa đăng nhập", 0])
        });
})

module.exports = router

