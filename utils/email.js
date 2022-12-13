require('dotenv').config();
const nodemailer = require("nodemailer");

exports.sendEmail = (obj) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: obj.email,
        subject: 'A copy of your responses',
        text: `email: ${obj.email}, name: ${obj.name}, contactNumber: ${obj.contactNumber}, college: ${obj.college}, branch: ${obj.branch}, yearOfPassOut: ${obj.yearOfPassOut}`
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent successfully.")
        }
    })
}