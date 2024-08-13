const express = require("express");
const { getAdmins, getPerformance } = require("../../controllers");
const router = express.Router();

router.get("/admins", getAdmins);
router.get("/performance/:id", getPerformance);

module.exports = router;
