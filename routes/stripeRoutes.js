const express = require("express");
const stripeController = require("../controllers/stripeController");

const router = express.Router();

router.post('/subscriptions', stripeController.createSubsciption);

module.exports = router;