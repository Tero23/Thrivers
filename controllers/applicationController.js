const Application = require("../models/applicationModel");
const Internship = require("../models/internshipModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const multer = require("multer");
const sharp = require("sharp");
const { sendEmail } = require("../utils/email");

exports.multerConfig = {
  storage: multer.diskStorage({
    //Setup where the user's file will go
    destination: function (req, file, next) {
      next(null, "./uploads/resumes");
    },

    //Then give the file a unique name
    filename: function (req, file, next) {
      next(null, Date.now() + "." + file.originalname);
    },
  }),
};

exports.createApplication = catchAsync(async (req, res, next) => {
  const {
    email,
    name,
    contactNumber,
    college,
    branch,
    yearOfPassOut,
    openingTitle,
  } = req.body;

  const application = await Application.create({
    email,
    name,
    contactNumber,
    college,
    branch,
    yearOfPassOut,
    openingTitle,
    resume: req.file.filename
  });
  sendEmail(email, name, contactNumber, college, branch, yearOfPassOut, openingTitle);

  res.status(201).json({
    application,
  });
});

exports.getAllApplications = catchAsync(async (req, res, next) => {
  const applications = await Application.find({});
  res.status(200).json({
    count: applications.length,
    applications,
  });
});

exports.getAllPendingApplications = catchAsync(async (req, res, next) => {
  const applications = await Application.find({ status: "Pending" });
  res.status(200).json({
    count: applications.length,
    applications,
  });
});

exports.getAllApprovedApplications = catchAsync(async (req, res, next) => {
  const applications = await Application.find({ status: "Approved" });
  res.status(200).json({
    count: applications.length,
    applications,
  });
});

exports.getApplicationById = catchAsync(async (req, res, next) => {
  const application = await Application.findOne({ _id: req.params.id });
  if (!application)
    return next(new AppError("There is no application with that id!", 404));
  res.status(200).json({
    application,
  });
});

exports.evaluateApplicationById = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  const application = await Application.findOne({ _id: req.params.id });
  if (!application)
    return next(new AppError("There is no application with that id!", 404));
  application.status = status;
  await application.save();
  res.status(200).json({
    application,
  });
});

exports.deleteAllRejectedApplications = catchAsync(async (req, res, next) => {
  await Application.deleteMany({ status: "Rejected" });
  res.status(200).json({
    message: "Applications successfully deleted!"
  })
})
