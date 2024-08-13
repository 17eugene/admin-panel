const { User } = require("../../models");

const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");

    res.status(200).json({
      message: "success",
      code: 200,
      customers,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = getCustomers;
