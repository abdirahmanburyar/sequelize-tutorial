const Contracts = require("../../models").contracts;
const db = require("../../models");

module.exports.createContract = async (req, res, next) => {
  try {
    if (!req.body) return res.status(500).json({ error: "invalid data" });
    const isFound = await Contracts.findOne({
      where: { contractor_id: req.body.contractor_id },
    });
    if (isFound) return res.status(400).json({ error: "Already Created" });
    const contract = await Contracts.build({
      from: req.body.from,
      to: req.body.to,
      contractor_id: req.body.contractor_id,
      inDays: req.body.inDays,
      salary: req.body.salary,
    });
    const newContract = await contract.save();

    return res.status(200).json(newContract);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.fetchContracts = async (req, res, next) => {
  try {
    const contract = await Contracts.findAll({
      include: [
        { model: db.managers, include: [{ model: db.managers_profiles }] },
      ],
    });
    return res.status(200).json(contract);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
