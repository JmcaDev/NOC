import { LogEntity, LogSeverityLevel} from "../../../src/domain/entities/log.entity"

describe("log.entity.ts", () => {
    
    const dataObj = {
        message: "Testing",
        level: LogSeverityLevel.high,
        origin: "log.entity.test.ts"
    }
    
    test("Should create a LogEntity instance", () => {


        const log = new LogEntity({
            message: "Testing",
            level: LogSeverityLevel.high,
            origin: "log.entity.test.ts"
        })

        expect(log).toBeInstanceOf(LogEntity)

        expect(log.message).toBe(dataObj.message)

        expect(log.origin).toBe(dataObj.origin)

        expect(log.level).toBe(dataObj.level)

        expect(log.createdAt).toBeInstanceOf(Date)


    })

    test("Should create a LogEntity instance from json", () => {

        const json = `{"message":"Service http://google.com working","level":"low","createdAt":"2025-07-17T00:13:55.278Z","origin":"log.entity.test.ts"}`
    
        const log = LogEntity.fromJson(json)

        expect(log).toBeInstanceOf(LogEntity)

        expect(log.message).toBe("Service http://google.com working")

        expect(log.origin).toBe("log.entity.test.ts")

        expect(log.level).toBe(LogSeverityLevel.low)

        expect(log.createdAt).toBeInstanceOf(Date)
    
    })

    test("Should create a LogEntity instance from json", () => {

        const log = LogEntity.fromObject(dataObj)

        expect(log).toBeInstanceOf(LogEntity)

        expect(log.message).toBe(dataObj.message)

        expect(log.origin).toBe(dataObj.origin)

        expect(log.level).toBe(dataObj.level)

        expect(log.createdAt).toBeInstanceOf(Date)
    
    })

})