const { User, Transaction } = require("../../models");
const { Schema, Mongoose, default: mongoose } = require("mongoose");

const getAffiliateStats = async (req, res) => {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },

      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },

      { $unwind: "$affiliateStats" },
    ]);

    const salesTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    const filteredSalesTransactions = salesTransactions.filter(
      (transaction) => transaction !== null
    );

    res.status(200).json({
      message: "success",
      code: 200,
      user: userWithStats[0],
      sales: filteredSalesTransactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = getAffiliateStats;
