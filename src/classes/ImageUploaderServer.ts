import * as express from 'express';
import ConfigurationManager from 'classes/ConfigurationManager';
import Logger from './Logger';

class ImageUploadServer {

    private imageUploaderServer: express.Application;

    constructor (private configurationManager: ConfigurationManager, private logger: Logger) {
        this.imageUploaderServer = express();
    }

    public addRouter (router: express.Router): void {
        this.imageUploaderServer.use(router);
    }

    public addUploadsPathAsStaticResource (): void {
        this.imageUploaderServer.use('/uploads', express.static(this.configurationManager.getUploadPath()));
    }

    public runServer (): void {
        
        const serverPort = this.configurationManager.getServerPort();
        this.imageUploaderServer.listen(serverPort, () => {
            this.logger.log(`Listening at http://localhost:${serverPort}/`);
        });
    }
}

export default ImageUploadServer;