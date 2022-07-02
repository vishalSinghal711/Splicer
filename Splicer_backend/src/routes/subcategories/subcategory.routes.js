const { Router } = require("express");
const router = Router();
const subCatMethods = require("./subcategory.controller");

//sub-category end-points
router.get(
  "/subcategories",
  subCatMethods.subCategoriesControllerMethods.getSubCategories
);
//parent_id is param which asks for all subcategories whose parent's id = parent_id
router.get(
  "/subcategories/:parent_id",
  subCatMethods.subCategoriesControllerMethods.getSpecificSubCategory
);

module.exports = router;
