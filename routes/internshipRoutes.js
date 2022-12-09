const express = require("express");
const router = express.Router();

const internshipController = require("../controllers/internshipController");

router
  .route("/")
  .get(internshipController.getAllInternships)
  .post(internshipController.createInternship);

module.exports = router;
