import express from 'express';
import type { Response, Request, NextFunction , ErrorRequestHandler} from 'express';
import { config } from './src/config/config.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const globalErrorHandler:ErrorRequestHandler = (err:Error, _req:Request, res:Response, _next: NextFunction) => { 
  const statusCode = (err as any).statusCode || 500;  // Type assertion for custom errors
    res.status(statusCode).json({
        errStack: config.get("NODE_ENVIRONMENT") === 'development' ? err.stack : "",
        message: err.message || 'Internal Server Error'
    });
}

app.use(globalErrorHandler)

export default app;