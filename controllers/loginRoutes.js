const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => 
    res.render('login')
);

module.exports = router;