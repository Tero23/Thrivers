const express = require("express");
const router = express.Router();
const multer = require("multer");

const refundController = require("../controllers/refundController");

router.post("/", multer(refundController.multerConfig).single("screenShot"), refundController.createRefund);

module.exports = router;