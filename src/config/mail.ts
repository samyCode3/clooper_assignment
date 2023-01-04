import nodemailer from 'nodemailer'
const createTransport = nodemailer.createTransport
export = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT as unknown as number,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

