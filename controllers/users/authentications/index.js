const { compareHash } = require("../../../helpers/Hashing");
const _ = require("lodash");
const Users = require("../../../models").users;

module.exports.loginUser = async (req, res) => {
  try {
    if (!req.body || req.body.email === "" || req.body.password === "") {
      return res.status(400).json({ error: "invalid data" });
    }
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).json({ error: "Account Not Found" });
    const isMatch = await compareHash(user.password, req.body.password);
    if (!isMatch) return res.status(400).json({ error: "invalid credentials" });
    req.session.user = _.pick(user, ["id", "fullName", "role", "email"]);
    return res
      .status(200)
      .json(_.pick(user, ["id", "fullName", "role", "email"]));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.logout = async (req, res) => {
  return req.session.destroy(function (err) {
    if (err) return res.status(500).json({ error: err });
    return res.status(200).json({ success: true });
  });
};

module.exports.checkAuth = async (req, res, next) => {
  if (req.session.user) return res.status(200).json({ isAuth: true });
  return res.status(401).json({ isAuth: false });
};
