import Express from 'express';
const con = require('./database');
const { Router } = require('express');
const router = Router();
router.use(Express.json());


router.post('/product', (req, res) => {
    var idsp = " WHERE sanpham.idsp = 1 ";
    var masosp = "1";
    if (req.body.idsp && req.body.idsp.trim()) {
        if (isNaN(req.body.idsp)) { } else {
            var idsp = " WHERE sanpham.idsp = " + req.body.idsp;
            var masosp = req.body.idsp;
        }
    };
    con.query(`SELECT idsp, ten , thongtin, imgchinh, gia, giamgia, sao, daban, soluongdg, danhmuc, cannangsp, sanpham.idshop, trangthaisp, tenshop, danhgia, tinh, huyen, xa, imgshop, diachi, lienheshop  FROM sanpham INNER JOIN shop ON sanpham.idshop = shop.idshop ` + idsp + ` ;
    SELECT * FROM imgsanpham WHERE idsanpham = ` + masosp + ` ;
    SELECT idnx, text, saonx, time, traloi, imgdaidien, khachhangten FROM nhanxet LEFT JOIN traloinhanxet ON nhanxet.idnx = traloinhanxet.idnhanxet LEFT JOIN khachhang ON nhanxet.idkhach = khachhang.idkh WHERE idsanpham = ` + masosp + ` ORDER BY idnx DESC LIMIT 0, 6 `, function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
})

module.exports = router

