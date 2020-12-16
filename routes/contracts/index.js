const router = require("express").Router();
const { isAuthenticated } = require("../../adapters/authentications");
const {
  createContract,
  fetchContracts,
} = require("../../controllers/contracts");
router.post("/create-contract", isAuthenticated, createContract);
router.get("/", isAuthenticated, fetchContracts);
// router.get("/fetch", isAuthenticated, fetchOne);
// router.put("/update-department", isAuthenticated, updateDepartment);
module.exports = router;
