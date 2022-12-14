const Project = require("../models/projectModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const multer = require("multer");
const { sendEmail } = require("../utils/email");

exports.multerConfig = {
  storage: multer.diskStorage({
    //Setup where the user's file will go
    destination: function (req, file, next) {
      next(null, "./uploads/SRS-Files");
    },

    //Then give the file a unique name
    filename: function (req, file, next) {
      next(null, Date.now() + "." + file.originalname);
    },
  }),
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

  if (!req.file) return next(new AppError("Please upload your SRS!", 400));

  const project = await Project.create({
    email,
    organizationName,
    contactNumber,
    Title,
    BriefDescription,
    Deadline,
    SRSFile: req.file.filename,
  });

  sendEmail({
    email,
    organizationName,
    contactNumber,
    Title,
    BriefDescription,
    Deadline,
  }, "project");

  res.status(201).json({
    message: "Project successfully created.",
    project,
  });
});
