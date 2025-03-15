const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('../middlewares');
const { createDomain, renderLogin } = require('../controllers');


router.get('/',renderLogin);
router.post('/domain',isLoggedIn,createDomain);

module.exports = router;