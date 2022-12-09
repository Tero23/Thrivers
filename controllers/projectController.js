const Project = require("../models/projectModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const multer = require("multer");
const sharp = require("sharp");

exports.multerConfig = {
  storage: multer.diskStorage({
    //Setup where the user's file will go
    destination: function (req, file, next) {
      next(null, "SRS-Files");
    },

    //Then give the file a unique name
    filename: function (req, file, next) {
      next(null, Date.now() + "." + file.originalname);
    },
  }),
  limits: {
    fileSize: 1000000
  }
};


exports.createProject = catchAsync(async (req, res, next) => {
  const {
    email,
    organizationName,
    contactNumber,
    Title,
    BriefDescription,
    Deadline,
  } = req.body;

  const project = await Project.create({
    email,
    organizationName,
    contactNumber,
    Title,
    BriefDescription,
    Deadline,
    SRSFile: req.file.filename,
  });

  res.status(201).json({
    message: "Project successfully created.",
    project,
  });
});
