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

router.post('/uploadimgsp', upload.single('imgdaidiensp'), (req, res) => {
    if (req.headers.cookie) {
        var sessionCookie = req.headers.cookie.replace("session=", "") || '';
    } else {
        var sessionCookie = '';
    }

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            if (req.body.ten && req.body.gia && req.body.giamgia && req.body.cannang && req.body.idshop && req.body.danhmuc) {
                let query = `INSERT INTO sanpham (ten, thongtin, imgchinh, gia, giamgia, danhmuc, cannangsp, idshop, firebasesp) VALUES (?,?,?,?,?,?,?,?,?);
                SELECT LAST_INSERT_ID();`;
                let ten = req.body.ten;
                let thongtin = req.body.thongtin;
                let imgchinh = "http://localhost:3000/" + req.file.path;
                let imgchinh1 = imgchinh.replace("public", '');
                let gia = req.body.gia;
                let giamgia = req.body.giamgia;
                let danhmuc = req.body.danhmuc;
                let cannangsp = req.body.cannang;
                let idshop = req.body.idshop;
                con.query(query, [ten, thongtin, imgchinh1, gia, giamgia, danhmuc, cannangsp, idshop,decodedClaims.user_id], function (err, rows) {
                    if (err) throw err;
                    res.send([rows, 1]);
                });
            } else {
                res.send('0')
            }

        })
        .catch((error) => {
            console.log(error)
            res.status(200).send(["Chưa đăng nhập", 0])
        });
})

module.exports = router

