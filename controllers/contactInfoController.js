const ContactInfo = require("../models/contactInfoModel");
const catchAsync = require("../utils/catchAsync");
const { sendEmail } = require("../utils/email");

exports.createContactInfo = catchAsync(async (req, res, next) => {
    const {
        email,
        name,
        contactNumber,
        college,
        branch,
        yearOfPassOut,
        query
      } = req.body;
    
      const contactInfo = await ContactInfo.create({
        email,
        name,
        contactNumber,
        college,
        branch,
        yearOfPassOut,
        query
      });
      
      sendEmail({email, name, contactNumber, college, branch, yearOfPassOut, query}, "contactInfo");

      res.status(201).json({
        contactInfo,
      });
});