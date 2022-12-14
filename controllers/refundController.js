const Refund = require("../models/refundModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const multer = require("multer");
const { sendEmail } = require("../utils/email");

exports.multerConfig = {
  storage: multer.diskStorage({
    //Setup where the user's file will go
    destination: function (req, file, next) {
      next(null, "./uploads/Refund-screenshots");
    },

    //Then give the file a unique name
    filename: function (req, file, next) {
      next(null, Date.now() + "." + file.originalname);
    },
  }),
};


exports.createRefund = catchAsync(async (req, res, next) => {
  const {
    email,
    name,
    contactNumber,
    college,
    branch,
    yearOfPassOut,
    purchaseDate,
  } = req.body;

  if (!req.file) return next(new AppError("Please upload your screenshot!", 400));

  const refund = await Refund.create({
    email,
    name,
    contactNumber,
    college,
    branch,
    yearOfPassOut,
    purchaseDate,
    screenShot: req.file.filename
  });

  sendEmail({email,
    name,
    contactNumber,
    college,
    branch,
    yearOfPassOut,
    purchaseDate}, "refund");

  res.status(201).json({
    message: "Refund successfully submitted!",
    refund,
  });
});