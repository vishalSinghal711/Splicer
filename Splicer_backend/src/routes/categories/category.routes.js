const { Router } = require("express");
const router = Router();
const { getCategories } = require("./category.controller");

//categories api end-point
router.get("/categories", getCategories);

module.exports = router;
