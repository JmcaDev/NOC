import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity"
import { LogRepository } from "../../../src/domain/repository/log.repository"



describe("log.repository.ts", () => {

    const newLog = new LogEntity({
        origin: "log.repository.test.ts",
        message: "test-message",
        level: LogSeverityLevel.low
    })

    class MockLogRepository implements LogRepository{

        async saveLog(log: LogEntity): Promise<void> {
            return
        }

        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }

    }

    test("should test the abstract class", async () => {

        const mockLogDatasource = new MockLogRepository()

        expect(mockLogDatasource).toBeInstanceOf(MockLogRepository)
        expect(typeof mockLogDatasource.saveLog).toBe( "function")
        expect(typeof mockLogDatasource.getLogs).toBe( "function")


        await mockLogDatasource.saveLog(newLog)
        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high)
        expect(logs).toHaveLength(1)
        expect(logs[0]).toBeInstanceOf(LogEntity)

    })

})