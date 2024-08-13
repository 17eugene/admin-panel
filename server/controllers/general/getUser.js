const { User } = require("../../models");

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json({
      message: "success",
      code: 200,
      user,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = getUser;
