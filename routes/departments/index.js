const router = require("express").Router();
const {
  createDepartment,
  fetchDepartment,
  fetchOne,
  updateDepartment,
} = require("../../controllers/department");
const { isAuthenticated } = require("../../adapters/authentications");
router.post("/create-department", isAuthenticated, createDepartment);
router.get("/", isAuthenticated, fetchDepartment);
router.get("/fetch", isAuthenticated, fetchOne);
router.put("/update-department", isAuthenticated, updateDepartment);
module.exports = router;
