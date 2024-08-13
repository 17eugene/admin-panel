const { model, Schema } = require("mongoose");

const affiliateStatSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    affiliateSales: {
      type: [Schema.Types.ObjectId],
      ref: "Transaction",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const AffiliateStat = model("AffiliateStat", affiliateStatSchema);

module.exports = AffiliateStat;
