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

router.post('/danhgianhanxet', (req, res) => {
    if (req.headers.cookie) {
        var sessionCookie = req.headers.cookie.replace("session=", "") || '';
    } else {
        var sessionCookie = '';
    }

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            con.query('SELECT sao, soluongdg FROM sanpham WHERE idsp =? ', req.body.idsanpham, function (err, rows) {
                if (err) throw err;
                let query = `INSERT INTO nhanxet (text, saonx, idkhach, idsanpham, time, idshopnx) VALUES (?, ?, ?, ?, ?, ?);
                UPDATE sanpham SET sao = ? WHERE idsp = ?;
                UPDATE sanpham SET soluongdg = ? WHERE idsp = ?;
                UPDATE sanpham SET daban = ? WHERE idsp = ?;
                `;
                let text = req.body.text;
                let saonx = req.body.saonx;
                let sao = Math.round(((Number(rows[0].sao)*Number(rows[0].soluongdg)) + Number(req.body.saonx))/(Number(rows[0].soluongdg)+1)*10)/10;
                let soluongdg = rows[0].soluongdg + 1;
                let idkhach = req.body.idkhach;
                let idsanpham = req.body.idsanpham;
                let time = req.body.time;
                let idshopnx = req.body.idshopnx;
                con.query(query, [text, saonx, idkhach, idsanpham, time,  idshopnx, sao, idsanpham, soluongdg ,idsanpham, soluongdg ,idsanpham], function (err, rows) {
                    if (err) throw err;
                    res.send('1');
                });
            });

          
        })
        .catch((error) => {
            res.status(200).send('0');
        });
})

module.exports = router

