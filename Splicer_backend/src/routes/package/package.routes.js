const { Router } = require('express');
const router = Router();
const { createPackage } = require('./package.controller');
 
router.post('/package/create/:adminKey', createPackage);

module.exports = router;
