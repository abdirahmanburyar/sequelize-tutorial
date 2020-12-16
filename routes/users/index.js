const router = require("express").Router();
const { isAuthenticated } = require("../../adapters/authentications");
const { createUser, fetchAllUsersOrUser } = require("../../controllers/users");
const {
  loginUser,
  logout,
  checkAuth,
} = require("../../controllers/users/authentications");
router.post("/create-user", createUser);
router.get("/", fetchAllUsersOrUser);
// router.get("/:userId", fetchUser);

//Authentications
router.post("/login", loginUser);
router.delete("/logout", logout);
router.get("/check-authentication", checkAuth);

module.exports = router;
