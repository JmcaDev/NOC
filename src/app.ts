import { Server } from "../src/presentation/server"
import { envs } from "./config/plugins/envs.plugin"
import { LogModel, MongoDatabase } from "./data/mongoDB"


async function main(){

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    //Crear una coleccion = table, documento = registro
    // const newLog = await LogModel.create({
    //     message: "Test message desde Mongo",
    //     origin: "app.ts",
    //     level: "low",
    // })

    // await newLog.save()

    // console.log(newLog)

    Server.start()
}

(async() => {
    main()
})()

