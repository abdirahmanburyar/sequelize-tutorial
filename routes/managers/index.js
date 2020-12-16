const router = require("express").Router();
const multerPicture = require("../../multer/picture");
const filesAttachment = require("../../multer/filesAttachment");
const {
  createManager,
  fetchManagers,
  fetchManager,
  updatePassword,
  updateManager,
} = require("../../controllers/managers");
const {
  createManageProfile,
  fetchManagersProfile,
  updateImage,
  uploadFiles,
  deleteDocument,
  updateManagerProfile,
} = require("../../controllers/manager-profile");

const { isAuthenticated } = require("../../adapters/authentications");
router.post("/create-manager", isAuthenticated, createManager);
router.post("/create-managers-profile", isAuthenticated, createManageProfile);
router.get("/", isAuthenticated, fetchManagers);
router.get("/managers-profile", isAuthenticated, fetchManagersProfile);
router.get("/manager", isAuthenticated, fetchManager);
router.put("/change-password", isAuthenticated, updatePassword);
router.put("/update-manager", isAuthenticated, updateManager);
router.put("/update-manager-profile", isAuthenticated, updateManagerProfile);
router.delete("/delete-file", isAuthenticated, deleteDocument);
router.put(
  "/change-picture",
  multerPicture.single("image"),
  isAuthenticated,
  updateImage
);

router.put(
  "/upload-files",
  filesAttachment.single("attchFiles"),
  isAuthenticated,
  uploadFiles
);

module.exports = router;
