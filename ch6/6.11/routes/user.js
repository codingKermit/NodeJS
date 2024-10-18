const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello, user');
})

router.get('/:id', (req, res) => {
    console.log(req.params, req.query);
    res.send('hello express');
})

module.exports = router;