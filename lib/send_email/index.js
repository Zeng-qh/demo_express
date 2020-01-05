"use strict";
const nodemailer = require("nodemailer");
const save_help = require("./../utils/save_help");
// const smtpTransport = require('nodemailer-smtp-transport')

var config = JSON.parse(save_help.ReadFileSync("./.config.json"))

async function main() {//
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: config.email.email, // generated ethereal user
            pass: config.email.emailkey // generated ethereal password
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: config.email.email, // sender address
        to: config.email.email, // list of receivers
        subject: "Hello", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body

        textEncoding: true,
        priority: "high"
    });
    //console.dir(info);
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    return info
}

// main().catch(console.error);

module.exports = { main }




