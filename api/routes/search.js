import Express from 'express';
const con = require('./database');
const { Router } = require('express');
const router = Router();
router.use(Express.json());


router.post('/search', (req, res) => {
    var q = "";
    if (req.body.q && req.body.q.trim()) {
        if (q == "undefined") { } else {
            var q = req.body.q;
        };
    };
    var tinh = "";
    if (req.body.tinh && req.body.tinh.trim()) {
        if (req.body.tinh == "undefined") { } else {
            var tinh = " AND tinh=" + req.body.tinh;
        };
    };
    var huyen = "";
    if (req.body.huyen && req.body.huyen.trim()) {
        if (req.body.huyen == "undefined") { } else {
            var huyen = " AND huyen=" + req.body.huyen;
        };
    };
    var xa = "";
    if (req.body.xa && req.body.xa.trim()) {
        if (req.body.xa == "undefined") { } else {
            var xa = " AND xa=" + req.body.xa;
        };
    };
    var gia = "";
    if (req.body.giadau && req.body.giadau.trim() && req.body.giacuoi && req.body.giacuoi.trim()) {
        if (isNaN(req.body.giadau) && isNaN(req.body.giacuoi)) { } else {
            var gia = " AND gia BETWEEN " + req.body.giadau + " AND " + req.body.giacuoi;
        };
    };

    var danhgia = "";
    if (req.body.danhgia && req.body.danhgia.trim()) {
        if (isNaN(req.body.danhgia)) { } else {
            var danhgia = " AND sao >=" + req.body.danhgia;
        }

    };
    var sapxep = "";
    if (req.body.sapxep && req.body.sapxep.trim()) {
        if (isNaN(req.body.sapxep)) { } else {
            if (req.body.sapxep == "1") {
                var sapxep = " ORDER BY daban DESC"
            };
            if (req.body.sapxep == "2") {
                var sapxep = " ORDER BY gia ASC"
            };
            if (req.body.sapxep == "3") {
                var sapxep = " ORDER BY gia DESC"
            };
        }
    };
    var page = " LIMIT 0, 36 ";
    if (req.body.page && req.body.page.trim()) {
        if (isNaN(req.body.page)) { } else {
            if (req.body.page >= 0) {
                var page = " LIMIT " + req.body.page + ", 36 ";
            }
        }
    } else {
        var page = " LIMIT 0, 36 ";
    };
    var danhmuc = "";
    if (req.body.danhmuc && req.body.danhmuc.trim()) {
        if (isNaN(req.body.danhmuc)) { } else {
            var danhmuc = " AND danhmuc=" + req.body.danhmuc;
        }
    };
    con.query('SELECT idsp, ten, thongtin, imgchinh, gia, giamgia, sao, daban, soluongdg, danhmuc, cannangsp, trangthaisp, tenshop, imgshop, diachi, lienheshop FROM sanpham INNER JOIN shop ON sanpham.idshop = shop.idshop WHERE ten  LIKE?' + tinh + huyen + xa + danhgia + danhmuc + gia + sapxep + page, ['%' + q + '%'], function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
})

module.exports = router

