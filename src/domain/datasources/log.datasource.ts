import { LogEntity, LogLevel } from "../entities/log.entity";



// Representa la fuente de datos de los logs. Nos permitirá guardar y recuperar logs de la base de datos.
// Ya que desde el repositorio se accede a la base de datos.
// Aquí se define parte de nuestras reglas de negocio.
export abstract class LogDataSource {

    
    abstract saveLog( log: LogEntity ): Promise<void>;

    abstract getLogs( severityLevel: LogLevel ): Promise<LogEntity[]>;

    
}