import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email-service"

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)

const emailService = new EmailService()


export class Server {

    public static start(){
        
        console.log("Server started...")

        // Mandar email

        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(["jmcadevtesting@gmail.com"])

        // CronService.createJob({
        //     cronTime: "*/5 * * * * *",
        //     onTick: () => {
        //         const url = "http://google.com"
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url)

        //     }
        // })
    }
}