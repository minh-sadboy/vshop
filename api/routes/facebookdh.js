// import Express from 'express';
// const con = require('./database');
// const { Router } = require('express');
// const router = Router();
// router.use(Express.json());
// const axios = require('axios')

// router.get('/webhook', (req, res) => {
//     if (req.query['hub.verify_token'] === 'vivishopqaz') {
//         res.send(req.query['hub.challenge']);
//     }
//     res.send('Error, wrong validation token');
// })

// router.post('/webhook', function (req, res) {
//     var entries = req.body.entry;
//     for (var entry of entries) {
//         var messaging = entry.messaging;
//         for (var message of messaging) {
//             var senderId = message.sender.id;
//             if (message.message) {
//                 // Nếu người dùng gửi tin nhắn đến
//                 if (message.message.text) {
//                     var text = message.message.text;
//                     if (text == 'hi' || text == "hello") {
//                         sendMessage(senderId, "Mã id của bạn là:" + message.sender.id);
//                         senddata(senderId)
//                     }
//                     else { sendMessage(senderId, "Xin lỗi, câu hỏi của bạn chưa có trong hệ thống, chúng tôi sẽ cập nhật sớm nhất."); }
//                 }
//             }
//         }
//     }
//     res.status(200).send("OK");
// });
// // Gửi thông tin tới REST API để Bot tự trả lời
// function sendMessage(senderId, message) {
//     axios
//         .post('https://graph.facebook.com/v12.0/me/messages?access_token=EAAO6GzZAfbr0BAPg8d1wvUmzqR4dlhF4DGD8oTIUNAzXBz9mfZBZAeZCGQdOGS45qQsaCOZC3F7GjIEjwORpkU3FPm5YBKsJct8WFyGEI8oUoI4Oal82zGBO2duSB5b7hm1NfZCQrQQzaulqQP9xuxchfvCRKXp8lfMib93RlnwuRLfLDUF02fdPurBDucKdC8yGnBwnu2jwZDZD', {
//             recipient: {
//                 id: senderId
//             },
//             message: {
//                 text: message
//             },
//             messaging_type: "MESSAGE_TAG",
//             tag: "CONFIRMED_EVENT_UPDATE"
//         })
// }


// module.exports = router

import Express from 'express';
const con = require('./database');
const { Router } = require('express');
const router = Router();
router.use(Express.json());
const axios = require('axios')

router.get('/webhook', (req, res) => {
    if (req.query['hub.verify_token'] === 'vivishopqaz') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Lỗi nhé');
})

router.post('/webhook', function (req, res) {
    var entries = req.body.entry;
    for (var entry of entries) {
        var messaging = entry.messaging;
        for (var message of messaging) {
            var senderId = message.sender.id;
            if (message.message) {
                // Nếu người dùng gửi tin nhắn đến
                if (message.message.text) {
                    var text = message.message.text;
                    if (text == 'hi' || text == "xin chao" || text == "hello" || text == 'thuc don' || text == "menu" || text == 'ho tro' || text == "help" || text.includes("Khóa ứng dụng")) {
                        if (text == 'hi' || text == "xin chao" || text == "hello") {
                            sendMessage(senderId, "Xin chào. Tôi có thể giúp gì cho bạn? Nhập thuc don - Để xem thực đơn. Nhập ho tro - Để được trợ giúp. Hi. May I help you? Enter menu - To view the menu. Enter help - For help.");
                        }
                        if (text == 'thuc don' || text == "menu") {
                            sendMessage(senderId, "Bạn truy cập vào website: http://localhost:3000/");
                        }
                        if (text == 'ho tro' || text == "help") {
                            sendMessage(senderId, "Bạn có thể tìm tôi trên Zalo.");
                        }
                        if (text.includes("Khóa ứng dụng")) {
                            const tinnhan = text.replace('Khóa', '').replace('ứng', '').replace('dụng', '').replace(':', '');
                            const apikey = tinnhan.replace(/\s/g, '');
                            axios
                                .post('http://localhost/apivivi/vivishop/thongbaomess/themvao', {
                                    token: apikey,
                                    faceid: senderId,
                                }).then((response) => {
                                    if (response.data == "1") {
                                        sendMessage(senderId, "Đã đăng ký thành công");
                                    }else{
                                        sendMessage(senderId, response + "ok");
                                    }
                                });
                        }
                    }
                    else { sendMessage(senderId, "Xin lỗi, câu hỏi của bạn chưa có trong hệ thống, chúng tôi sẽ cập nhật sớm nhất.") };
                }
            }
        }
    }
    res.status(200).send("OK");
});
// Gửi thông tin tới REST API để Bot tự trả lời
function sendMessage(senderId, message) {
    axios
        .post('https://graph.facebook.com/v12.0/me/messages?access_token=EAAMl9eyG0wwBAP4dsmAYI0v012Tu81XEeIxKJN3GBJwAXBQqwBnvMR5cLPOlZB2OZCCtQBeiCSdZA649sdkZAf5oEzQy0AN1O9BdvUAldZAngLEwODc2m3w6g6Bqk1fg47oYBzYJMJOK8MojmYmYKgRTwYvlMCL84uM8YVAtP3ALZCmmtrw9qGt6ZA8RSGUMyE5jaKgm74bZCwZDZD', {
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



