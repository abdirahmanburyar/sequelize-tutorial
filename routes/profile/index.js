const router = require("express").Router();
const { createProfile, fetchProfiles } = require("../../controllers/profiles");
const { isAuthenticated } = require("../../adapters/authentications");
router.post("/create-profile", createProfile);
router.get("/", isAuthenticated, fetchProfiles);
module.exports = router;
