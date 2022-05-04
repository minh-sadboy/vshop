import Express from 'express';
const con = require('./database');
const { Router } = require('express');
const router = Router();
router.use(Express.json());


router.post('/nhanxet', (req, res) => {
    var sonhanxet = " LIMIT 0,6 ";
    if (req.body.sonhanxet){
        if (isNaN(req.body.sonhanxet)) { } else {
            var sonhanxet = " LIMIT " + req.body.sonhanxet + " , 6 ";
        }
    };
    var masosp = "1";
    if (req.body.idsp) {
        if (isNaN(req.body.idsp)) { } else {
            var masosp = req.body.idsp;
        }
    };
    con.query('SELECT idnx, text, saonx, time, traloi, imgdaidien, khachhangten FROM nhanxet LEFT JOIN traloinhanxet ON nhanxet.idnx = traloinhanxet.idnhanxet LEFT JOIN khachhang ON nhanxet.idkhach = khachhang.idkh WHERE idsanpham = ' + masosp + ' ORDER BY idnx DESC ' + sonhanxet, function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
})

module.exports = router

