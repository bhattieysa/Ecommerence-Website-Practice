import compression from "compression"
import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import helmet from "helmet"
import pinoHttp from "pino-http"
import { logger } from "./utils/logger"
import { errorMiddleware } from "./middleware/error.middleware"
import { notFoundMiddleware } from "./middleware/notFound.middleware"

export const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(pinoHttp({ logger }))


app.get("/health", (_req, res) => {
    res.json({ 
        status: "ok",
        environment: process.env.NODE_ENV,
        message: "Server is running" 
    })
})

app.use(errorMiddleware)
app.use(notFoundMiddleware)

