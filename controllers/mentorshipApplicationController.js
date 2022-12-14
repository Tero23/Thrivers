const MentorshipApplication = require("../models/mentorshipApplicationModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const multer = require("multer");
const { sendEmail } = require("../utils/email");

exports.multerConfig = {
  storage: multer.diskStorage({
    //Setup where the file will go
    destination: function (req, file, next) {
      next(null, "./uploads/QR-screenShots");
    },
    //Then give the file a unique name
    filename: function (req, file, next) {
      next(null, Date.now() + "." + file.originalname);
    },
  }),
};

exports.createMentorship = catchAsync(async (req, res, next) => {
    const {
      email,
      name,
      contactNumber,
      college,
      branch,
      yearOfPassOut,
      formProviderName,
      mentorshipName,
    } = req.body;

    if (!req.file) return next(new AppError("Please upload your screenShot!", 400));
  
    const mentorship = await MentorshipApplication.create({
      email,
      name,
      contactNumber,
      college,
      branch,
      yearOfPassOut,
      formProviderName,
      mentorshipName,
      screenShot: req.file.filename,
    });
    sendEmail({email, name, contactNumber, college, branch, yearOfPassOut, formProviderName, mentorshipName}, "mentorshipApp");
  
    res.status(201).json({
        mentorship,
    });
  });

  exports.payMentorship = catchAsync(async (req, res, next) => {
    
  })