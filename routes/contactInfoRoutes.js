const express = require("express");
const router = express.Router();

const contactInfoController = require("../controllers/contactInfoController");

router.post("/", contactInfoController.createContactInfo);

module.exports = router;