import { config } from "./lib/Common/infrastructure/config/config";
import { Logger } from "./lib/Common/infrastructure/logger/logger";
import { Server } from "./lib/Common/infrastructure/server/server";

const server = new Server();

let api
if (!config.production) {
    (server.init() as any).listen(config.port, () => {
      Logger.info(`🚀 Server is running on port ${config.port}`);
    });
}else {
    api = server.init();
}
export { api } 
