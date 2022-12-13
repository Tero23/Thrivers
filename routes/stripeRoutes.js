const express = require("express");
const stripeController = require("../controllers/stripeController");

const router = express.Router();

router.post('/subscriptions', stripeController.createSubsciption);
router.post('/plans', stripeController.createSubscriptionPlan);


module.exports = router;