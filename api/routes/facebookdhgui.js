import Express from 'express';
const con = require('./database');
const { Router } = require('express');
const router = Router();
router.use(Express.json());
const axios = require('axios')


router.post('/facebookdhgui', function (req, res) {
    con.query('SELECT faceid FROM facebookmes WHERE idshopfacebookmes = ?', req.body.idshop, function (err, rows) {
        if (err) throw err;        
        sendMessage(rows[0].faceid, "Bạn có đơn hàng mới. Giá đơn hàng:" + req.body.giadh);
        res.status(200).send("OK");
    });
});
// Gửi thông tin tới REST API để Bot tự trả lời
function sendMessage(senderId, message) {
    axios
        .post('https://graph.facebook.com/v12.0/me/messages?access_token=EAAO6GzZAfbr0BAPg8d1wvUmzqR4dlhF4DGD8oTIUNAzXBz9mfZBZAeZCGQdOGS45qQsaCOZC3F7GjIEjwORpkU3FPm5YBKsJct8WFyGEI8oUoI4Oal82zGBO2duSB5b7hm1NfZCQrQQzaulqQP9xuxchfvCRKXp8lfMib93RlnwuRLfLDUF02fdPurBDucKdC8yGnBwnu2jwZDZD', {
            recipient: {
                id: senderId
            },
            message: {
                text: message
            },
            messaging_type: "MESSAGE_TAG",
            tag: "CONFIRMED_EVENT_UPDATE"
        })
}

module.exports = router

