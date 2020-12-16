const db = require("../../models");
const Department = require("../../models").departments;
const Managers = require("../../models").managers;

module.exports.createManageProfile = async (req, res, next) => {
  try {
    const manager = await db.managers_profiles.build({
      address: req.body.address,
      image: req.body.image,
      phone: req.body.phone,
      managerId: req.body.managerId,
    });
    const newManager = await manager.save();

    return res.status(200).json(newManager);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.fetchManagersProfile = async (req, res, next) => {
  try {
    const profile = await db.managers_profiles.findAll({
      include: [{ model: Managers, include: [{ model: Department }] }],
    });
    return res.status(200).json(profile);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.updateImage = async (req, res, next) => {
  try {
    if (!req.file || !req.query.id)
      return res.status(400).json({ error: "Invalid Data" });
    const result = await db.managers_profiles.update(
      {
        image: req.file.path,
      },
      {
        where: { managerId: req.query.id },
      },
      {
        returning: true,
        plain: true,
      }
    );
    if (!result) return res.status(500).json({ error: "Error Occured" });
    return res
      .status(200)
      .json({ success: true, msg: "image has been updated" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.updateManagerProfile = async (req, res, next) => {
  try {
    if (!req.query.id) return res.status(400).json({ error: "Invalid Data" });
    const result = await db.managers_profiles.update(
      {
        ...req.body,
      },
      {
        where: { managerId: req.query.id },
      },
      {
        returning: true,
        plain: true,
      }
    );
    if (!result) return res.status(500).json({ error: "Error Occured" });
    return res
      .status(200)
      .json({ success: true, msg: "Record has been updated" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.uploadFiles = async (req, res, next) => {
  try {
    if (!req.file || !req.query.id)
      return res.status(400).json({ error: "Invalid Data" });
    const result = await db.managers_files.build({
      docs: req.file.path,
      managerId: req.query.id,
      fileName: req.file.originalname.split(".")[0],
    });
    const newDoc = await result.save();
    if (!newDoc) return res.status(500).json({ error: "Error Occured" });
    return res
      .status(200)
      .json({ success: true, msg: "File has been uploaded" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.deleteDocument = async (req, res, next) => {
  try {
    if (!req.query.id) return res.status(400).json({ error: "Invalid Data" });
    const result = await db.managers_files.destroy({
      where: { id: req.query.id },
    });
    if (!result) return res.status(500).json({ error: "Error Occured" });
    return res.status(200).json({ msg: "File has been deleted" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
