import { LogEntity, LogEntityOptions, LogLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceUseCase {

    execute( url: string ): Promise<boolean>;
}

type SuccessCallback = (() => void ) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;


export class CheckService implements CheckServiceUseCase{


    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
        private readonly logRepository: LogRepository,
    ) {

    }

    async execute( url: string ): Promise<boolean> {
        
        
        try {

            console.log( 'Checking url:', url)

            const req = await fetch( url );
            if ( !req.ok ) throw new Error(`Request failed to ${url}`);

            const options: LogEntityOptions = {
                level: LogLevel.low,
                message: `Request to ${url} was successful`,
                origin: 'Check-Service.ts',
            }

            const log = new LogEntity( options ) ;

            this.logRepository.saveLog( log );

            this.successCallback && this.successCallback();

            return true;

            
        } catch (error) {

            const errorMessage = `Request to ${url} failed`;

            const options: LogEntityOptions = {
                level: LogLevel.high,
                message: errorMessage,
                origin: 'Check-Service.ts',
            
            }

            const log = new LogEntity( options );
            
            this.logRepository.saveLog( log );

            this.errorCallback && this.errorCallback( errorMessage );


            return false;
        }
    }
}