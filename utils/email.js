require('dotenv').config();
const nodemailer = require("nodemailer");

exports.sendEmail = (obj, service) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const fixedPart = `email: ${obj.email}, name: ${obj.name}, contactNumber: ${obj.contactNumber}, college: ${obj.college}, branch: ${obj.branch}, yearOfPassOut: ${obj.yearOfPassOut}`;
    let variablePart;
    if (obj.hasOwnProperty("query")) variablePart = `query: ${obj.query}`;
    if (obj.hasOwnProperty("openingTitle")) variablePart = `openingTitle: ${obj.openingTitle}`;
    if (obj.hasOwnProperty("formProviderName")) variablePart = `formProviderName: ${obj.openingTitle}, mentorshipName: ${obj.mentorshipName}`;
    if (obj.hasOwnProperty("purchaseDate")) variablePart = `purchaseDate: ${obj.purchaseDate}`;

    const projectText = `email: ${obj.email}, organizationName: ${obj.organizationName}, contactNumber: ${obj.contactNumber}, Title: ${obj.Title}, BriefDescription: ${obj.BriefDescription}, Deadline: ${obj.Deadline}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: obj.email,
        subject: 'A copy of your responses',
        text: service === "project" ? projectText: fixedPart + ", " + variablePart,
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent successfully.")
        }
    })
}