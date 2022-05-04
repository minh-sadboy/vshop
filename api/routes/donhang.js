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

router.post('/donhang', (req, res) => {
    if (req.headers.cookie) {
        var sessionCookie = req.headers.cookie.replace("session=", "") || '';
    } else {
        var sessionCookie = '';
    }

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            let query = `INSERT INTO donhang (idkhdh, khoangcachdh, idtinhdh, idhuyendh, idxadh, textdiachidh, ghichudh, cannangdh, datadonhang, toadovitridh, tonggiadh, thanhtiendh, madonhang, idshopdh,	idfirebasedh, trangthaidh, timedh) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
            let idkhdh = req.body.idkhdh;
            let khoangcachdh = req.body.khoangcachdh;
            let idtinhdh = req.body.idtinhdh;
            let idhuyendh = req.body.idhuyendh;
            let idxadh = req.body.idxadh;
            let textdiachidh = req.body.textdiachidh;
            let ghichudh = req.body.ghichudh;
            let cannangdh = req.body.cannangdh;
            let datadonhang = req.body.datadonhang;
            let toadovitridh = req.body.toadovitridh;
            let tonggiadh = req.body.tonggiadh;
            let thanhtiendh = req.body.thanhtiendh;
            let madonhang = (new Date()).getTime();
            let idshopdh = req.body.idshopdh;
            let timedh = req.body.timedh;
            con.query(query, [idkhdh, khoangcachdh, idtinhdh, idhuyendh, idxadh, textdiachidh, ghichudh, cannangdh, datadonhang, toadovitridh, tonggiadh, thanhtiendh, madonhang, idshopdh, decodedClaims.user_id, '1', timedh], function (err, rows) {
                if (err) throw err;
                res.send('1');
            });

        })
        .catch((error) => {
            res.status(200).send('0');
        });
})

module.exports = router

