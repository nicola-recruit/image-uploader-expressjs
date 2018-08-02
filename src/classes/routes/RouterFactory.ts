import { Router, Request, Response, NextFunction } from 'express';
import PostImageController from './PostImageController';
import Logger from '../Logger';
import ConfigurationManager from '../ConfigurationManager';
import * as multer from 'multer';

class RouterFactory {

    constructor (private configurationManager: ConfigurationManager, private logger: Logger) {}

    public buildImageRouter (): Router {
        const router: Router = Router();
        const fileInputName = this.configurationManager.getFileInputName();
        const uploadFilePath = this.configurationManager.getUploadPath();
        const uploadMiddleware = multer({
            dest: uploadFilePath
        });

        router.post('/image', uploadMiddleware.single(fileInputName), (request: Request, response: Response, next: NextFunction) => {
            const controller = new PostImageController(this.logger);
            controller.executeController(request, response, next);
        })

        return router;
    }
}

export default RouterFactory;