const express = require("express");
const router = express.Router();
const multer = require("multer");

const applicationController = require("../controllers/applicationController");

router
  .route("/")
  .get(applicationController.getAllApplications)
  .post(multer(applicationController.multerConfig).single("resume"), applicationController.createApplication);

router.get("/pending", applicationController.getAllPendingApplications);

router.route("/approved").get(applicationController.getAllApprovedApplications);

router.route("/rejected").delete(applicationController.deleteAllRejectedApplications);

router
  .route("/:id")
  .get(applicationController.getApplicationById)
  .put(applicationController.evaluateApplicationById);



module.exports = router;
