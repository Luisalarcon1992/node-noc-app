import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/env.plugin'


interface SendMailOptions {
    to: string;
    subject: string;
    htmlBody: string;

} 

export class EmailService {

    private tansporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });


    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody } = options;

        try {
            

            const sentInformation = await this.tansporter.sendMail({
                from: envs.MAILER_EMAIL,
                to,
                subject,
                html: htmlBody
            });

            // console.log(sentInformation);

            
            return true;
        } catch (error) {

            return false;
        }
    }

}