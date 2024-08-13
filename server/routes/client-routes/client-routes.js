const express = require("express");

const router = express.Router();
const {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
} = require("../../controllers");

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geo", getGeography);

module.exports = router;
