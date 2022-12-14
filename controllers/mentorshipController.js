const Mentorship = require("../models/mentorshipModel");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");

exports.multerConfig = {
    storage: multer.diskStorage({
      //Setup where the user's file will go
      destination: function (req, file, next) {
        next(null, "./uploads/MentorshipImages");
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
  
  exports.resizePhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`images/${req.file.filename}`);
    next();
  });

exports.createMentorship = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const mentorship = await Mentorship.create({
    name,
    price,
    image: req.file.filename
  });
  res.status(201).json({
    mentorship,
  });
});

exports.getAllMentorships = catchAsync(async (req, res, next) => {
  const mentorships = await Mentorship.find({});
  res.status(200).json({
    count: mentorships.length,
    mentorships,
  });
});
