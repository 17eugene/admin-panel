const { Schema, model } = require("mongoose");

const productStatSchema = Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
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
  },
  { timestamps: true, versionKey: false }
);

const ProductStat = model("ProductStat", productStatSchema);

module.exports = ProductStat;
