const { Product, ProductStat } = require("../../models");

const getProducts = async (_, res) => {
  try {
    const products = await Product.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id.toString(),
        });

        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json({
      message: "success",
      code: 200,
      productsWithStats,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = getProducts;
