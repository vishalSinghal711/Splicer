const { Router } = require('express');
const router = Router();
const { createPackage, getPackages } = require('./package.controller');

//admin key must not be in params
//change in next commit
router.post('/package/create/:adminKey', createPackage);

router.get('/package/all', getPackages);

module.exports = router;
