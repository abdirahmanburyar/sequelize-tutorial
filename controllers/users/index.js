const Users = require("../../models").users;
const Profile = require("../../models").profiles;

module.exports.createUser = async (req, res, next) => {
  try {
    if (!req.body) return res.status(400).json({ error: "Invalid data" });
    const found = await Users.findOne({ where: { email: req.body.email } });
    if (found) return res.status(400).json({ error: "Email already in use!" });
    const user = await Users.create(req.body);
    if (!user) return res.status(500).json({ error: "error occured" });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.fetchAllUsersOrUser = async (req, res) => {
  try {
    const fetchUsers = await Users.findAll({
      include: [Profile],
    });
    if (!fetchUsers) return res.status(404).json({ msg: "404" });
    return res.status(200).json(fetchUsers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
