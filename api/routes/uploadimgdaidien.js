import Express from 'express';
const { Router } = require('express');
const con = require('./database');
const router = Router();
var admin = require('firebase-admin');
router.use(Express.json());
var serviceAccount = require("./vivi-2d40a-firebase-adminsdk-qtqoa-dbca668094.json");
const multer = require('multer');
const path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === "image/jpg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, 'api/public/uploads/');
        }

    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});
const upload = multer({ storage });
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

router.post('/uploadimgdaidien', upload.single('imgdaidien'), (req, res) => {
    if (req.headers.cookie) {
        var sessionCookie = req.headers.cookie.replace("session=", "") || '';
    } else {
        var sessionCookie = '';
    }

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            if (req.body.khachhangten && req.body.phone && req.body.idfirebase) {
                let query = `INSERT INTO khachhang (imgdaidien, khachhangten, phone, idfirebase) VALUES (?,?,?,?);`;
                let imgdaidien = "http://localhost:3000/" + req.file.path;
                let imgdaidien1 = imgdaidien.replace("public", '');
                let khachhangten = req.body.khachhangten;
                let phone = req.body.phone;
                let idfirebase = req.body.idfirebase;
                con.query(query, [imgdaidien1, khachhangten, phone, idfirebase], function (err, rows) {
                    if (err) throw err;
                    res.send('1');
                    
                });
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(200).send(["Chưa đăng nhập", 0])
        });
})

module.exports = router

