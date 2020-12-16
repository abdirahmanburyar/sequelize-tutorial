const Profiles = require("../../models").profiles;
const Users = require("../../models").users;

module.exports.createProfile = async (req, res, next) => {
  try {
    if (!req.body) return res.status(500).json({ error: "invalid data" });
    const userProfile = await Profiles.build({
      address: req.body.address,
      image: req.body.image,
      user_id: req.session.user.id,
    });
    const newProfile = await userProfile.save();

    return res.status(200).json({ Profile: newProfile });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports.fetchProfiles = async (req, res, next) => {
  try {
    const profile = await Profiles.findAll({
      include: [{ model: Users }],
    });
    return res.status(200).json({ profile });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
