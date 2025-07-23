import { LogEntity } from "../../../../src/domain/entities/log.entity"
import {CheckServiceMultiple} from "../../../../src/domain/use-cases/checks/check-service-multiple"

describe("check-service.ts", () => {

    const mockRepo1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const mockRepo2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const mockRepo3 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }

    const successCallback = jest.fn()
    const errorCallback = jest.fn()


    const checkService = new CheckServiceMultiple(
        [mockRepo1, mockRepo2, mockRepo3],
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

        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

    })

    test("Should call errorCallback when fetch fails", async () => {


        const wasOk = await checkService.execute("https://12345.com")

        expect(wasOk).toBe(false)

        expect(errorCallback).toHaveBeenCalled()
        expect(successCallback).not.toHaveBeenCalled()

        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepo3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

    })
})