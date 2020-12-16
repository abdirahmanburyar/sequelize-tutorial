const { hash, compare } = require("bcryptjs");
module.exports = {
  hashPassword: async (password) =>
    await hash(password, parseInt(process.env.HASH_SALT)),
  compareHash: async (hashedPass, password) =>
    await compare(password, hashedPass),
};
