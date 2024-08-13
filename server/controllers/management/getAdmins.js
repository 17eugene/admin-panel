const { User } = require("../../models");

const getAdmins = async (_, res) => {
  try {
    const admins = await User.find({ role: "admin" });

    res.status(200).json({
      message: "success",
      code: 200,
      admins,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = getAdmins;
