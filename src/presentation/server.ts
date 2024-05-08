import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron-service";


// Instancia de para la implementación de los repository

const fileSystemLogRepository = new LogRepositoryImplementation(
    new FileSystemDataSource() // Este es facil de cambiar por otro datasource, por ejemplo una base de datos MongoDB, Postgres, etc
);

export class Server {

    public static start() {
        
        
        
        CronService.createJob('*/5 * * * * *', () => {

            const url = 'https://google.com';

            new CheckService(
                () => console.log( `${ url } is ok` ),
                ( error ) => console.log( error ),
                fileSystemLogRepository,
            ).execute( url );
            // new CheckService().execute( 'http://localhost:3000' );            
          
        });

    };
}