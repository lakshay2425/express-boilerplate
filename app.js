import express from 'express';
import { config } from './src/config/config.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err, _req, res, _next) => { 
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        errStack: config.get("NODE_ENVIRONMENT") === 'development' ? err.stack : "",
        message: err.message || 'Internal Server Error'
    });
}

app.use(globalErrorHandler)

export default app;