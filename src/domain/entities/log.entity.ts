
export enum LogSeverityLevel {
    low = "low",
    medium = "medium",
    high = "high"
}

export interface LogEntityOptios{
    level: LogSeverityLevel
    message: string
    origin: string
    createdAt?: Date
}

export class LogEntity {

    public level: LogSeverityLevel // Enum
    public message: string
    public createdAt: Date
    public origin: string

    constructor(options: LogEntityOptios){
        const { message, level, origin, createdAt = new Date()} = options
        this.message = message
        this.level = level
        this.createdAt = createdAt
        this.origin = origin
    }

    static fromJson = (json: string): LogEntity => {
        const {message, level, createdAt, origin} = JSON.parse(json)

        const log = new LogEntity({
            message,
            level,
            createdAt,
            origin,
        })
        log.createdAt = new Date(createdAt)
        
        return log
    }
}
