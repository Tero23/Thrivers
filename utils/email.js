require('dotenv').config();
const nodemailer = require("nodemailer");

exports.sendEmail = (email, name, contactNumber, college, branch, yearOfPassOut, openingTitle) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'A copy of your responses',
        text: `email: ${email}, name: ${name}, contactNumber: ${contactNumber}, college: ${college}, branch: ${branch}, yearOfPassOut: ${yearOfPassOut}, ${openingTitle === "undefined" ? "query": "openingTitle"}:${openingTitle ? openingTitle: query}`
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent successfully.")
        }
    })
}