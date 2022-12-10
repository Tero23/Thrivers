const Member = require("../models/memberModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const multer = require("multer");
const sharp = require("sharp");

exports.multerConfig = {
  storage: multer.diskStorage({
    //Setup where the user's file will go
    destination: function (req, file, next) {
      next(null, "./uploads/images");
    },

    //Then give the file a unique name
    filename: function (req, file, next) {
      next(null, Date.now() + "." + file.originalname);
    },
  }),

  //A means of ensuring only images are uploaded.
  fileFilter: function (req, file, next) {
    if (!file) {
      next();
    }
    const image = file.mimetype.startsWith("image/");
    if (image) {
      next(null, true);
    } else {
      return next();
    }
  },
};

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`images/${req.file.filename}`);
  next();
});

exports.getAllMembers = catchAsync(async (req, res, next) => {
  const members = await Member.find({});
  res.status(200).json({
    count: members.length,
    members,
  });
});

exports.createMember = catchAsync(async (req, res, next) => {
  const { name, role, linkedIn } = req.body;
  const member = await Member.create({
    name,
    role,
    linkedIn,
    image: req.file.filename,
  });
  res.status(201).json({
    member,
  });
});
