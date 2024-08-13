const getUser = require("./general/getUser");
const getProducts = require("./client/getProducts");
const getCustomers = require("./client/getCustomers");
const getTransactions = require("./client/getTransactions");
const getGeography = require("./client/getGeography");
const getSales = require("./sales/getSales");
const getAdmins = require("./management/getAdmins");
const getPerformance = require("./management/getPerformance");
const getDashboard = require("./general/getDashboard");

module.exports = {
  getUser,
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
  getSales,
  getAdmins,
  getPerformance,
  getDashboard
};
