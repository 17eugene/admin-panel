const { Transaction } = require("../../models");

const getTransactions = async (req, res) => {
  try {
    const { page = 1, itemsPerPage = 20, search = "", sort = null } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      console.log("sort", sort);
      console.log("sortParsed", sortParsed);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      console.log("sortFormatted", sortFormatted);

      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * itemsPerPage)
      .limit(itemsPerPage);

    const totalDocs = await Transaction.countDocuments({
      userId: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      message: "success",
      code: 200,
      data: {
        transactions,
        totalDocs,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = getTransactions;
