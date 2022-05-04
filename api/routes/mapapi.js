import Express from 'express';
const con = require('./database');
const { Router } = require('express');
const router = Router();
router.use(Express.json());


router.post('/mapapi', (req, res) => {
    var tinh = " tinh=36 ";
    if (req.body.tinh && req.body.tinh.trim()) {
        if (req.body.tinh == "undefined") { } else {
            if (isNaN(req.body.tinh)) { } else {
                var tinh = " tinh=" + req.body.tinh;
            }

        };
    };
    var huyen = " AND huyen=365 ";
    if (req.body.huyen && req.body.huyen.trim()) {
        if (req.body.huyen == "undefined") { } else {
            if (isNaN(req.body.huyen)) { } else {
                var huyen = " AND huyen=" + req.body.huyen;
            }

        };
    };
    var xa = "";
    if (req.body.xa && req.body.xa.trim()) {
        if (req.body.xa == "undefined") { } else {
            if (isNaN(req.body.xa)) { } else {
                var xa = " AND xa=" + req.body.xa;
            }

        };
    };
    con.query('SELECT idshop, tenshop, diachi FROM shop WHERE' + tinh + huyen + xa, function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });
})

module.exports = router

