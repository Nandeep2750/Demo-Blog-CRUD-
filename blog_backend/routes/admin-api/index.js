var express = require('express');
var router = express.Router();

var authRouter = require('./auth');
var blogRouter = require('./blog');

router.use('/auth', authRouter);
router.use('/blog', blogRouter);

module.exports = router;