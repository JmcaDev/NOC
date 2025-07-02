import { Server } from "../src/presentation/server"
import { envs } from "./config/plugins/envs.plugin"


function main(){
    Server.start()
    // console.log(envs)
}

(async() => {
    main()
})()

