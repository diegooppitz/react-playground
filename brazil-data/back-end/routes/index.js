const express = require('express')
const controller = require('../controllers/index')
const router = express.Router()

router.get('/', controller.dataOptions);
router.get('/filters', controller.filterOptions);
router.get('/generate-data', controller.generateData);

module.exports = router;