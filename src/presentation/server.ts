import { LogSeverityLevel } from "../domain/entities/log.entity"
import { CheckService } from "../domain/use-cases/checks/check-service"
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple"
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource"
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email-service"

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
)

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
)

const emailService = new EmailService()


export class Server {

    public static async start(){
        
        console.log("Server started...")

        // Mandar email

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(["jmcadevtesting@gmail.com"])

        // const logs = await logRepository.getLogs(LogSeverityLevel.low)
        // console.log(logs)

        // CronService.createJob({
        //     cronTime: "*/5 * * * * *",
        //     onTick: () => {
        //         const url = "http://google.com"
        //         new CheckServiceMultiple(
        //             [fsLogRepository, postgresLogRepository, mongoLogRepository],
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url)

        //     }
        // })
    }
}