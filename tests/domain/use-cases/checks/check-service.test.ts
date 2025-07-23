import { LogEntity } from "../../../../src/domain/entities/log.entity"
import {CheckService} from "../../../../src/domain/use-cases/checks/check-service"

describe("check-service.ts", () => {

    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCallback = jest.fn()
    const errorCallback = jest.fn()


    const checkService = new CheckService(
        mockRepository,
        successCallback,
        errorCallback
    )

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("Should call successCallback when fetch returns true", async () => {


        const wasOk = await checkService.execute("https://google.com")

        expect(wasOk).toBe(true)

        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )

    })

    test("Should call errorCallback when fetch fails", async () => {


        const wasOk = await checkService.execute("https://12345.com")

        expect(wasOk).toBe(false)

        expect(errorCallback).toHaveBeenCalled()
        expect(successCallback).not.toHaveBeenCalled()

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )

    })
})