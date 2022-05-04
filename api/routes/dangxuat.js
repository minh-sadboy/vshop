import Express from 'express';
const { Router } = require('express');
const con = require('./database');
const router = Router();
router.use(Express.json());
var admin = require('firebase-admin');
var serviceAccount = require("./vivi-2d40a-firebase-adminsdk-qtqoa-dbca668094.json");
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

router.post('/dangxuat', (req, res) => {
    if (req.headers.cookie) {
        var sessionCookie = req.headers.cookie.replace("session=", "") || '';
    } else {
        var sessionCookie = '';
    }
    res.clearCookie('session');
    admin
        .auth()
        .verifySessionCookie(sessionCookie)
        .then((decodedClaims) => {
            return admin.auth().revokeRefreshTokens(decodedClaims.sub);
        })
        .then(() => {
            res.send("1");
        })
        .catch((error) => {
            res.send("1");
        });

})

module.exports = router

