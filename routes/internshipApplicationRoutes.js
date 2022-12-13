const express = require("express");
const router = express.Router();
const multer = require("multer");

const internshipApplicationController = require("../controllers/internshipApplicationController");

router
  .route("/")
  .get(internshipApplicationController.getAllApplications)
  .post(multer(internshipApplicationController.multerConfig).single("resume"), internshipApplicationController.createApplication);

router.get("/pending", internshipApplicationController.getAllPendingApplications);

router.route("/approved").get(internshipApplicationController.getAllApprovedApplications);

router.route("/rejected").delete(internshipApplicationController.deleteAllRejectedApplications);

router
  .route("/:id")
  .get(internshipApplicationController.getApplicationById)
  .put(internshipApplicationController.evaluateApplicationById);



module.exports = router;
