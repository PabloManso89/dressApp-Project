const express = require('express');
const logger = require('../common/logger').logger;
const path = require('path');

const router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  logger.info('/ - incoming request');
  res.sendFile(path.resolve('dist/index.html'));
});


module.exports = router;
