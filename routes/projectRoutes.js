const express = require("express");
const router = express.Router();
const multer = require("multer");

const projectController = require("../controllers/projectController");

router.post("/",multer(projectController.multerConfig).single("file"), projectController.createProject);

module.exports = router;
