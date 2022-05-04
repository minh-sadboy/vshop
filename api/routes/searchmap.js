import Express from 'express';
const con = require('./database');
const { Router } = require('express');
const router = Router();
router.use(Express.json());


router.post('/searchmap', (req, res) => {    
    con.query('SELECT tenshop, diachi, idshop FROM shop WHERE tenshop LIKE ?','%' + req.body.query  + '%', function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });    
})

module.exports = router

