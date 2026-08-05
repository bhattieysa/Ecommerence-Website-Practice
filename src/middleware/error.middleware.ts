import {Request, Response, NextFunction} from "express"
import { logger } from "../utils/logger"

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    logger.error(err)
    res.status(500).json({
        success: false,
        message: err.message
    })
}
