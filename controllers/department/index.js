const Department = require("../../models").departments;
const Managers = require("../../models").managers;
const ManagersProfile = require("../../models").managers_profile;

module.exports.createDepartment = async (req, res, next) => {
  try {
    if (!req.body) return res.status(500).json({ error: "invalid data" });
    const isFound = await Department.findOne({
      where: { name: req.body.name },
    });
    if (isFound) return res.status(400).json({ error: "Already Created" });
    const department = await Department.build({
      name: req.body.name,
      manager_id: req.body.manager_id,
    });
    const newdepartment = await department.save();

    return res.status(200).json(newdepartment);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.updateDepartment = async (req, res, next) => {
  try {
    if (!req.query.id) return res.status(404).json({ error: "invalid data" });
    const updateDepart = await Department.update(
      {
        ...req.body.depart,
        manager_id: req.body.managerId
          ? req.body.managerId
          : req.body.depart.manager_id,
      },
      {
        where: { id: req.query.id },
      }
    );
    if (!updateDepart) res.status(500).json({ error: "invalid data" });
    return res.status(200).json({ msg: "successfuly updated record" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.fetchDepartment = async (req, res, next) => {
  try {
    const deparment = await Department.findAll({
      include: [{ model: Managers }],
    });
    return res.status(200).json(deparment);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.fetchOne = async (req, res, next) => {
  try {
    if (!req.query.id) return res.status(404).json({ error: "invalid data" });
    const depart = await Department.findOne({
      where: { id: req.query.id },
      include: [{ model: Managers }],
    });
    if (!depart) return res.status(404).json({ error: "404 Not Found" });
    return res.status(200).json(depart);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
