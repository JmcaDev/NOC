import { CheckService } from "../domain/use-cases/checks/check-service"
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from "./email/email-service"

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)



export class Server {

    public static start(){
        
        console.log("Server started...")

        // Mandar email
        const emailService = new EmailService()
        emailService.sendEmail({
            to: "jmcadevtesting@gmail.com",
            subject: "logs de sistema",
            htmlBody: `
                <h2>Logs de sistema - NOC </h2>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                <p>ver logs adjuntos</p>
            `
        })

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