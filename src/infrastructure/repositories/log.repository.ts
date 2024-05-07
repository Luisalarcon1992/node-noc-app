import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";


// La idea de esta clase es implementar la interfaz del repositorio de logs, y en este caso, se implementa la interfaz LogRepository
// Se inyecta el datasource de logs, que es el encargado de realizar las operaciones de persistencia de los logs
// Se implementan los metodos de la interfaz LogRepository, que son los que se encargan de realizar las operaciones de persistencia de los logs
// Con esto logramos desacoplar la logica de persistencia de los logs de la logica de negocio, y ademas, se facilita la realizacion de pruebas unitarias
// Tan solo modificando el constructor de la clase, se puede cambiar el datasource de logs, sin tener que modificar el resto del codigo

export class LogRepositoryImplementation implements LogRepository {
    
    constructor(
        private readonly logDataSource: LogDataSource, 
    ) {

    }


    async saveLog(log: LogEntity): Promise<void> {
       
       return this.logDataSource.saveLog(log);
    }



    async getLogs(severityLevel: LogLevel): Promise<LogEntity[]> {
        
        return this.logDataSource.getLogs(severityLevel);
    }

}