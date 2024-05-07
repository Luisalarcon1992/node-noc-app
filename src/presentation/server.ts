import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {

    public static start() {
        
        
        CronService.createJob('*/5 * * * * *', () => {
            
            () => {

                new CheckService(
                    () => console.log('Success'),
                    (error) => console.error(error)
                ).execute('https://www.google.com');
            }
        });
    };
}