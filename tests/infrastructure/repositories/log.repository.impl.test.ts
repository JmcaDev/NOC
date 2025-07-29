import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity"
import { LogRepositoryImpl } from "../../../src/infrastructure/repositories/log.repository.impl"



describe("log.repository.impl.ts", () => {

    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }


    const logRepository = new LogRepositoryImpl(mockLogDatasource)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("saveLog should call the datasource with arguments", async () => {

        const log = { level: LogSeverityLevel.high, message: "hola"} as LogEntity
        await logRepository.saveLog(log)

        expect( mockLogDatasource.saveLog).toHaveBeenCalledWith(log)


    })

    test("getLogs should call the datasource with arguments", async () => {
        
        const logSeverity = LogSeverityLevel.low

        await logRepository.getLogs(logSeverity)
        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(logSeverity)

    })

})