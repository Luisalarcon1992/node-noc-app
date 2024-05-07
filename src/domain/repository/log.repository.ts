import { LogEntity, LogLevel } from "../entities/log.entity";


// Nos permitirá guardar y recuperar logs de la base de datos. Ya que desde el repositorio se accede a la base de datos.

export abstract class LogRepository {

    
    abstract saveLog( log: LogEntity ): Promise<void>;

    abstract getLogs( severityLevel: LogLevel ): Promise<LogEntity[]>;

    
}