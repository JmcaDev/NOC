import mongoose from "mongoose"
import { MongoDatabase } from "../../../src/data/mongoDB/init"

describe("init.test.ts", () => {

    afterAll(() => {
        mongoose.connection.close()
    })
    
    test("Should connect to MongoDB", async () => {
        
        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!
        })

        expect(connected).toBe(true)

    })

    test("Should throw an error", async () => {
        try {

            const connected = await MongoDatabase.connect({
                dbName: process.env.MONGO_DB_NAME!,
                mongoUrl: "mongodb://testFail:123456789@localhost:27017/"
            })

            expect(true).toBe(false)
        } catch (error) {}
    })
})