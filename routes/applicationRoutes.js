const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/applicationController");

router
  .route("/")
  .get(applicationController.getAllApplications)
  .post(applicationController.createApplication);

router.get("/pending", applicationController.getAllPendingApplications);

router.route("/approved").get(applicationController.getAllApprovedApplications);

router.route("/rejected").delete(applicationController.deleteAllRejectedApplications);

router
  .route("/:id")
  .get(applicationController.getApplicationById)
  .put(applicationController.evaluateApplicationById);



module.exports = router;
