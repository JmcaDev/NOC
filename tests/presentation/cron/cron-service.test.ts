import { CronService } from "../../../src/presentation/cron/cron-service"


describe("cron-service.ts", () => {

    const mockTick = jest.fn()

    test("Should create a job", (done) => {
        const job = CronService.createJob({cronTime: "* * * * * * ", onTick: mockTick})

        setTimeout(() => {
            expect(mockTick).toHaveBeenCalledTimes(2)
            job.stop()
            done()
        }, 2000)
    })

})