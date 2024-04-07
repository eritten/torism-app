const nodemailer = require('nodemailer');

// Function to create a transporter for sending emails
function createTransporter(smtpService, authUser, authPassword) {
    return nodemailer.createTransport({
        host: smtpService,
        port: 587,
        // secure: false, // true for 465, false for other ports
        rejectUnauthorized: false,
        auth: {
            user: authUser,
            pass: authPassword
        }
    });
}

// Function to send an email
async function sendMail(from, to, subject, html, transporter) {
    try {
        let options = { from, to, subject, html };
        let info = await transporter.sendMail(options);
        console.log('Email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Error occurred while sending email:', error);
        throw error;
    }
}

// Create transporter using specified details
let transporter = createTransporter("mail.niveel.com", "adm@niveel.com", "!Store526$");

// Function to send email with verification code
async function sendMailWithVerificationCode(code, userEmail) {
    // HTML body containing the verification code
    let htmlBody = `
        <p>Dear User,</p>
        <p>Thank you for signing up for our Torism App.</p>
        <p>Your verification code is: <strong>${code}</strong></p>
        <p>Please use this code to complete the registration process.</p>
        <br>
        <p>Best regards,</p>
        <p>The Anystore Team</p>
    `;

    // Send email with HTML body containing the verification code
    sendMail("support@anystoreweb.com", userEmail, "Anystore Mobile App - Verification Code", htmlBody, transporter)
        .then(() => console.log("Email sent successfully"))
        .catch(err => console.error("Error sending email:", err));
}

module.exports = sendMailWithVerificationCode