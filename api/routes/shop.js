import Express from "express";
const con = require("./database");
const { Router } = require("express");
const router = Router();
router.use(Express.json());


router.post("/shop", (req, res) => {
    var q = '';
    if (req.body.q && req.body.q.trim()) {
        if (q == "undefined") { } else {
            var q = req.body.q;
        };
    };

    var sapxep = '';
    if (req.body.sapxep && req.body.sapxep.trim()) {
        if (isNaN(req.body.sapxep)) { } else {
            if (req.body.sapxep == "1") {
                var sapxep = ` ORDER BY sanpham.daban DESC `
            };
            if (req.body.sapxep == "2") {
                var sapxep = ` ORDER BY sanpham.gia ASC `
            };
            if (req.body.sapxep == "3") {
                var sapxep = ` ORDER BY sanpham.gia DESC `
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
    var danhmuc = '';
    if (req.body.danhmuc && req.body.danhmuc.trim()) {
        if (isNaN(req.body.danhmuc)) { } else {
            var danhmuc = " AND sanpham.danhmuc=" + req.body.danhmuc;
        }
    };
    var shopid = 1;
    if (req.body.shopid) {
        if (isNaN(req.body.shopid)) { } else {
            var shopid = req.body.shopid;
        }

    };
    let query = `SELECT idsp, ten, thongtin, imgchinh, gia, giamgia, sao, daban FROM sanpham INNER JOIN shop ON sanpham.idshop = shop.idshop WHERE sanpham.ten LIKE? AND shop.idshop = ? ${danhmuc} ${sapxep} ${page};
    SELECT imgshop, idshop, danhgia, tinh, huyen, xa, diachi, lienheshop, tenshop FROM shop WHERE idshop = ?`;
    con.query(query, ["%" + q + "%", shopid,shopid], function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
})

module.exports = router

