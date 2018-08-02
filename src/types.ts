import { Request, Response, NextFunction } from 'express';

export type ExpressMiddleware = (request: Request, response: Response, next: NextFunction) => void;

export interface RouteController {

    executeController: ExpressMiddleware;
};