import { envs } from "../config/plugins/env.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


// Instancia de para la implementación de los repository

const fileSystemLogRepository = new LogRepositoryImplementation(
    new FileSystemDataSource() // Este es facil de cambiar por otro datasource, por ejemplo una base de datos MongoDB, Postgres, etc
);

export class Server {

    public static start() {
        
        console.log(envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY)

        // CronService.createJob('*/5 * * * * *', () => {
            
        //     const url = 'https://google.com';

        //     new CheckService(
        //         () => console.log( `${ url } is ok` ),
        //         ( error ) => console.log( error ),
        //         fileSystemLogRepository,
        //     ).execute( url );   
        // });

        const emailService = new EmailService();

       const date = new Date();

       console.log( date );

        emailService.sendEmail({
            to: 'luisalarcon1992@gmail.com',
            subject: 'Test',
            htmlBody: date.toString()
        })

        emailService.sendEmail({
            to: 'arajaureguib@gmail.com',
            subject: 'Test',
            htmlBody: date.toString()
        })

    };
}