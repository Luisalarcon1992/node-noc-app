
export enum LogLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export interface LogEntityOptions {
    level: LogLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {

    public level: LogLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;


    constructor( options: LogEntityOptions ) {
        const { level, message, origin, createdAt = new Date() } = options;
        this.level = level;
        this.message = message;
        this.createdAt = createdAt;
        this.origin = origin;
    }


    static fromJson( json: string ): LogEntity {

        const {message, level, createdAt, origin } = JSON.parse( json);

        const log = new LogEntity( { message, level, origin });

        return log;
    }
}