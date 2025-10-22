import { config } from "./lib/Common/infrastructure/config/config";
import { Logger } from "./lib/Common/infrastructure/logger/logger";
import { Server } from "./lib/Common/infrastructure/server/server";
import { Express } from "express";

const server = new Server();

export const api =server.init();
if (!config.production) {
    (api as Express).listen(config.port,()=> {
        Logger.info(`🚀 Server is running on port ${config.port}`)
    })
}

