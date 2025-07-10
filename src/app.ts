import { Server } from "../src/presentation/server"
import { envs } from "./config/plugins/envs.plugin"
import { LogModel, MongoDatabase } from "./data/mongoDB"
import { PrismaClient } from "./generated/prisma"


async function main(){

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    Server.start()
}

(async() => {
    main()
})()

