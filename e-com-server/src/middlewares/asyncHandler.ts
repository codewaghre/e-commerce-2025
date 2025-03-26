
import { Request, Response, NextFunction } from 'express';
import { AsyncFunction } from '../types/types.js';

export const TryCatch =
    (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };  