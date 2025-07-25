import mongoose from "mongoose"
import { envs } from "../../src/config/plugins/envs.plugin"
import { LogModel, MongoDatabase } from "../../src/data/mongoDB"
import { MongoLogDatasource } from "../../src/infrastructure/datasources/mongo-log.datasource"
import { LogEntity, LogSeverityLevel } from "../../src/domain/entities/log.entity"



describe("mongo-log.datasource.ts", () => {

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    })
    
    afterEach( async () => {
        await LogModel.deleteMany()
        
    })
    
    afterAll( async () => {
        
        mongoose.connection.close()
        
    })
    
    //Variables
    const logDataSource = new MongoLogDatasource()
    const log = new LogEntity({
            level: LogSeverityLevel.high,
            message: "test message",
            origin: "mongo-log.datasource.test.ts"
        })

    test("Should create a log", async () => {

        const logSpy = jest.spyOn(console, "log")

        

        await logDataSource.saveLog(log)

        expect( logSpy ).toHaveBeenCalled()
        expect( logSpy ).toHaveBeenCalledWith("Mongo Log created:",expect.any(String))



    })

    test("Should get logs", async () => {

        await logDataSource.saveLog(log)
        await logDataSource.saveLog(log)

        const logs = await logDataSource.getLogs(LogSeverityLevel.high)

        expect(logs.length).toBe(2)
        expect(logs[0].level).toBe(LogSeverityLevel.high)

    })

})