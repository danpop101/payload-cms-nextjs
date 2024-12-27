"use server"

import nodemailer, { TransportOptions } from 'nodemailer';

// ...existing code...

export async function sendEmail(to: string, subject: string, text: string) {
    try{
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport(<TransportOptions>{
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        // secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER, // your email
            pass: process.env.EMAIL_PASSWORD, // your email password
        },
    });

    // Setup email data
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        replyTo: process.env.EMAIL_ADDRESS,
        to: to,
        subject: subject,
        text: text,
    };

    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    return { success: true, info: info };
}
catch(error){
    console.error('Failed to send email',error);
    return{ success: false, error: 'Failed to send email'};
}
}