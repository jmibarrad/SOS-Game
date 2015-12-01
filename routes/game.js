/**
 * Created by Light on 01-Dec-15.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('../public/Game');
});

module.exports = router;