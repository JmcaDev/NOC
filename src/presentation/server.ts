import { LogSeverityLevel } from "../domain/entities/log.entity"
import { CheckService } from "../domain/use-cases/checks/check-service"
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email-service"

const logRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
    // new MongoLogDatasource()
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

        const logs = await logRepository.getLogs(LogSeverityLevel.low)
        console.log(logs)

        // CronService.createJob({
        //     cronTime: "*/5 * * * * *",
        //     onTick: () => {
        //         const url = "http://google.com"
        //         new CheckService(
        //             logRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url)

        //     }
        // })
    }
}