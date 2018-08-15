import { Router, Request, Response, NextFunction } from 'express';
import PostImageController from './PostImageController';
import Logger from '../Logger';
import ConfigurationManager from '../ConfigurationManager';
import * as multer from 'multer';
import * as cors from 'cors';
import { ExpressMiddleware } from '../../types';

class RouterFactory {

    constructor (private configurationManager: ConfigurationManager, private logger: Logger) { }

    public buildImageRouter (): Router {
        const router: Router = Router();
        const fileInputName = this.configurationManager.getFileInputName();
        const uploadFilePath = this.configurationManager.getUploadPath();

        router.use(this.createCorsMiddleware());

        router.options('*', this.createCorsMiddleware());

        router.post('/image', this.createUploadMiddleware(fileInputName, uploadFilePath), (request: Request, response: Response, next: NextFunction) => {
            const controller = new PostImageController(this.logger);
            controller.executeController(request, response, next);
        });

        return router;
    }

    private createCorsMiddleware (): ExpressMiddleware {
        const options: cors.CorsOptions = {
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: '*',
            preflightContinue: false
        };

        return cors(options);
    }

    private createUploadMiddleware (fileInputName: string, uploadFilePath: string): ExpressMiddleware {
        const storage = multer.diskStorage({
            destination: (request, file, callback) => {
                callback(null, uploadFilePath);
            },
            filename: (request, file, callback) => {
                callback(null, file.originalname);
            }
        });

        const uploadMiddleware = multer({
            storage: storage
        });

        return uploadMiddleware.single(fileInputName);
    }
}

export default RouterFactory;