const { OverallStat, Transaction } = require("../../models");

const getDashboard = async (_, res) => {
  try {
    const currentMonth = "September";
    const currentDay = "2021-09-30";
    const currentYear = 2021;

    /* Recent transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    /* Overall stat */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      dailyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res.status(200).json({
      message: "success",
      code: 200,
      data: {
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        salesByCategory,
        thisMonthStats,
        todayStats,
        transactions,
      },
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = getDashboard;
