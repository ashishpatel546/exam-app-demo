import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            email?: any
        }
    }
    } 


export class UserMiddleware implements NestMiddleware{
    use(req: Request, _res: Response, next: NextFunction) {
        const email = req.headers['email']
        req.email = email
        next()
    }
    
}