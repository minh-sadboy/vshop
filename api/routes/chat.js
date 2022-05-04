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

router.post('/chat', (req, res) => {
    if (req.headers.cookie) {
        var sessionCookie = req.headers.cookie.replace("session=", "") || '';
    } else {
        var sessionCookie = '';
    }

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            con.query('SELECT * FROM chat WHERE firebasekhachchat=? ', decodedClaims.user_id, function (err, rows) {
                if (err) throw err;
                if (rows.length > 0) {
                    let query = `UPDATE chat SET noidungchat = ? WHERE firebasekhachchat = ? AND idshopchata = ?`;
                    con.query(query, [req.body.noidungchat, decodedClaims.user_id, req.body.idshopchata], function (err, rows) {
                        if (err) throw err;
                        res.send('1');
                    });
                } else {
                    if (req.body.idshopchata && req.body.noidungchat) {
                        if (isNaN(req.body.idshopchata)) { } else {
                            let query = `INSERT INTO chat (noidungchat, firebasekhachchat, idshopchata, trangthaikhachchat, trangthaishopchat, ngay) VALUES (?,?,?,?,?,?);`;
                            const ngay = (new Date()).getDate();
                            con.query(query, [req.body.noidungchat, decodedClaims.user_id, req.body.idshopchata, 0, 1, ngay], function (err, rows) {
                                if (err) throw err;
                                res.send('1');
                            });
                        }
                    }else{
                        res.send('0');
                    };

                }
            });

        })
        .catch((error) => {
            res.status(200).send(["Chưa đăng nhập", 0])
        });
})

module.exports = router

