"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const mailer_1 = require("../config/mailer");
const env_1 = require("../config/env");
async function sendEmail(opts) {
    if (!env_1.env.emailUser || !env_1.env.emailPass) {
        throw new Error('Missing EMAIL_USER/EMAIL_PASS in environment');
    }
    return await mailer_1.transporter.sendMail({
        from: `"Skin From North" <${env_1.env.emailUser}>`,
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
    });
}
