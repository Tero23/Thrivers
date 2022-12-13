const express = require("express");
const router = express.Router();
const multer = require("multer");

const mentorshipApplicationController = require("../controllers/mentorshipApplicationController");

router.post("/", multer(mentorshipApplicationController.multerConfig).single("screenShot"), mentorshipApplicationController.createMentorship);

module.exports = router;