const { Schema, model } = require("mongoose");

const transactionSchema = Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    cost: {
      type: String,
      required: true,
    },

    products: {
      type: [Schema.Types.ObjectId],
      of: Number,
    },
  },
  { timestamps: true, versionKey: false }
);

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
