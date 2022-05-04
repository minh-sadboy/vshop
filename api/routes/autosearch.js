import Express from 'express';
const con = require('./database');
const { Router } = require('express');
const router = Router();
router.use(Express.json());


router.post('/autosearch', (req, res) => {    
    con.query('SELECT ten FROM sanpham WHERE ten LIKE ?','%' + req.body.query  + '%', function (err, rows) {
        if (err) throw err;
        res.json(rows);
    });    
})

module.exports = router

