const mail = require('../config/mail');

export = {
    sendMail: async (details: any)  => {
        let { to, subject, text, html } = details;
        to = to.join(', ');
        const send = await mail.sendMail({
            from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_MAIL}>`,
            to,
            subject,
            text,
            html
        });
        
        try{
            return send.messageId;
        }catch(error){
            throw error;
        }
    }
}