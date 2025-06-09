import { CronJob } from "cron"

interface ICreateJob {
    cronTime: string | Date
    onTick: () => void
}

type Crontime = String | Date

export class CronService {
    public static createJob({cronTime, onTick}: ICreateJob): CronJob{
        const job = new CronJob(cronTime,onTick)
        
        job.start()

        return job
    }
} 