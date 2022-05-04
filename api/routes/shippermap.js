import Express from 'express';
const con = require('./database');
const { Router } = require('express');
const router = Router();
router.use(Express.json());


router.post('/shippermap', (req, res) => {
    con.query('SELECT toadovitridh, madonhang, khachhangten, phone  FROM donhang INNER JOIN khachhang ON donhang.idkhdh = khachhang.idkh WHERE trangthaidh = 2', function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
})

module.exports = router

