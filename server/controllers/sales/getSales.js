const { OverallStat } = require("../../models");

const getSales = async (_, res) => {
  try {
    const overallStats = await OverallStat.find();

    res.status(200).json(overallStats[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = getSales;
