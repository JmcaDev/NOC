import { LogEntity } from "../../../../src/domain/entities/log.entity"
import { LogRepository } from "../../../../src/domain/repository/log.repository"
import { SendEmailLogs } from "../../../../src/domain/use-cases/email/send-email-logs"
import { EmailService } from "../../../../src/presentation/email/email-service"


describe("send-email-logs.ts", () => {

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const sendEmailLogs = new SendEmailLogs(
            mockEmailService as any,
            mockLogRepository
    )

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("Should call sendEmail and saveLog", async () => {

        const result = await sendEmailLogs.execute("jmcadevtesting@gmail.com")

        expect( result ).toBe(true)

        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1)
        expect( mockLogRepository.saveLog ).toHaveBeenCalledWith(expect.any(LogEntity))
        expect( mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date), 
            level: "low", 
            message: "Log email sent", 
            origin: "send-email-logs.ts"
        })

    })

    test("Should log in case of error", async () => {

        mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false)

        const result = await sendEmailLogs.execute("jmcadevtesting@gmail.com")

        expect( result ).toBe(false)

        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1)
        expect( mockLogRepository.saveLog ).toHaveBeenCalledWith(expect.any(LogEntity))
        expect( mockLogRepository.saveLog).toHaveBeenCalledWith({
            createdAt: expect.any(Date), 
            level: "high", 
            message: "Error: Email log not sent", 
            origin: "send-email-logs.ts"
        })

    })

})