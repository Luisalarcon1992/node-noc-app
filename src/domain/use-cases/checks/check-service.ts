import { LogEntity, LogLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceUseCase {

    execute( url: string ): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = ( error: string ) => void;


export class CheckService implements CheckServiceUseCase{


    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
        private readonly logRepository: LogRepository,
    ) {

    }

    async execute( url: string ): Promise<boolean> {
        
        try {

            const req = await fetch( url );
            if ( !req.ok ) throw new Error(`Request failed to ${url}`);

            const log = new LogEntity( LogLevel.low, `Request to ${url} was successful` ) ;
            this.logRepository.saveLog( log );

            this.successCallback();

            return true;

        } catch (error) {

            const errorMessage = `Request to ${url} failed`;

            const log = new LogEntity( LogLevel.high, errorMessage );
            
            this.logRepository.saveLog( log );

            this.errorCallback( errorMessage );

            return false;
        }
    }
}