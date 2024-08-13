const { Schema, model } = require("mongoose");

const overallStatModel = Schema(
  {
    totalCustomers: {
      type: Number,
      required: true,
    },

    yearlySalesTotal: {
      type: Number,
      required: true,
    },

    yearlyTotalSoldUnits: {
      type: Number,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    monthlyData: [
      {
        month: {
          type: String,
        },
        totalSales: {
          type: Number,
        },
        totalUnits: {
          type: Number,
        },
      },
    ],

    dailyData: [
      {
        date: {
          type: String,
        },
        totalSales: {
          type: Number,
        },
        totalUnits: {
          type: Number,
        },
      },
    ],

    salesByCategory: {
      type: Map,
      of: Number,
    },
  },

  { timestamps: true, versionKey: false }
);

const OverallStat = model("OverallStat", overallStatModel);

module.exports = OverallStat;
