import Express from 'express';
const con = require('./database');
const { Router } = require('express');
const router = Router();
router.use(Express.json());


router.post('/goiyhomnay', (req, res) => {
    con.query("SELECT idsp, ten, imgchinh, gia, giamgia, sao, daban FROM sanpham ORDER BY RAND() LIMIT 36;", function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
})

module.exports = router