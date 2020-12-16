const Department = require("../../models").departments;
const Managers = require("../../models").managers;
const ManagerProfile = require("../../models").managers_profiles;
const ManagerFiles = require("../../models").managers_files;
const Contract = require("../../models").contracts;

const { hash } = require("bcryptjs");

module.exports.createManager = async (req, res, next) => {
  try {
    if (!req.body) return res.status(500).json({ error: "invalid data" });
    const isFound = await Managers.findOne({
      where: { email: req.body.email },
    });
    if (isFound) return res.status(400).json({ error: "Already Created" });
    const managers = await Managers.build({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      role: req.body.role,
    });
    const newManagers = await managers.save();
    if (!newManagers) return res.status(403).json({ error: "Error" });
    const manager = await ManagerProfile.build({
      address: null,
      image: `uploads/assets/images/profile.png`,
      phone: null,
      managerId: newManagers.id,
    });
    await manager.save();
    return res
      .status(200)
      .json({ msg: "Record has been created", managerId: newManagers.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.updateManager = async (req, res, next) => {
  try {
    if (!req.query.id) return res.status(404).json({ error: "Invalid Data" });
    const manager = await Managers.findByPk(req.query.id);
    if (!manager) return res.status(404).json({ error: "Not Found" });
    const result = await Managers.update(
      {
        ...req.body,
      },
      {
        where: { id: manager.id },
      },
      {
        returning: true,
        plain: true,
      }
    );

    if (!result) return res.status(404).json({ error: result });
    return res.status(200).json({ msg: "Record has been updated" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
    s;
  }
};

module.exports.fetchManagers = async (req, res, next) => {
  try {
    const managers = await Managers.findAll({
      include: [
        { model: Department },
        { model: ManagerProfile },
        { model: ManagerFiles },
        { model: Contract },
      ],
    });
    return res.status(200).json(managers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.updatePassword = async (req, res, next) => {
  try {
    if (!req.query.id || !req.body.password || req.body.password === "")
      return res.status(404).json({ error: "Invalid Data" });
    const manager = await Managers.findByPk(req.query.id);
    if (!manager) return res.status(404).json({ error: "Not Found" });
    req.body.password = await hash(req.body.password, 10);
    const result = await Managers.update(
      {
        password: req.body.password ? req.body.password : manager.password,
      },
      {
        where: { id: manager.id },
      },
      {
        returning: true,
        plain: true,
      }
    );

    if (!result) return res.status(404).json({ error: result });
    return res.status(200).json({ msg: "password has been updated" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
    s;
  }
};

module.exports.fetchManager = async (req, res, next) => {
  try {
    const managers = await Managers.findOne({
      where: { id: req.query.id },
      include: [
        { model: Department },
        { model: ManagerProfile },
        { model: ManagerFiles },
        { model: Contract },
      ],
    });
    return res.status(200).json(managers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
