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

router.post('/caidatshop', (req, res) => {
    if (req.headers.cookie) {
        var sessionCookie = req.headers.cookie.replace("session=", "") || '';
    } else {
        var sessionCookie = '';
    }

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            let query = `INSERT INTO dangkishop (tenshopdks, firebasedks, madks, gmaildks) VALUES (?, ?, ?, ?);`;
            let tenshopdks = req.body.tenshop;
            let firebasedks = decodedClaims.user_id;
            let madks1 = (new Date()).getTime().toString();
            let madks = madks1.split("").reverse().join("");
            let gmaildks = req.body.gmail;
            con.query(query, [tenshopdks, firebasedks, madks, gmaildks], function (err, rows) {
                if (err) throw err;
                res.send(madks);
            });

        })
        .catch((error) => {
            res.status(200).send('0');
            console.log(error)
        });
})

module.exports = router

