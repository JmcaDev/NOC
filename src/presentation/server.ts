import { CheckService } from "../domain/use-cases/checks/check-service"
import { CronService } from "./cron/cron-service"

export class Server {
    public static start(){
        console.log("Server started...")

        CronService.createJob({
            cronTime: "*/5 * * * * *",
            onTick: () => {
                const url = "https://google.com"
                new CheckService(
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error)
                ).execute(url)

                // new CheckService().execute("http://localhost:3000/")

            }
        })
    }
}