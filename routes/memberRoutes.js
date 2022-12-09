const express = require("express");
const router = express.Router();
const multer = require("multer");

const memberController = require("../controllers/memberController");

router
  .route("/")
  .get(memberController.getAllMembers)
  .post(
    memberController.resizeUserPhoto,
    multer(memberController.multerConfig).single("image"),
    memberController.createMember
  );

module.exports = router;
