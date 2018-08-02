import { RouteController } from 'types';
import { Request, Response, NextFunction } from 'express';
import Logger from '../Logger';



class PostImageController implements RouteController {

    constructor (private logger: Logger) {}

    public executeController (request: Request, response: Response, next: NextFunction): void {
        this.logger.log('Received one file ' + request.file.filename);
        response.send('POST request to the homepage')
    }
}

export default PostImageController;