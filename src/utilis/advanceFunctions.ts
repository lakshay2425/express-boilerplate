import type { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncHandler =  <T extends RequestHandler>(fn:T):T => {
    return ((req: Request, res: Response, next:NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }) as T;
};


//Database operation wrapper
export const dbOperation = async <T>(operation:()=> Promise<T>, errorMessage:string): Promise<T> => {
    try {
        return await operation();
    } catch (error:unknown) {
            const err = error as Error;
        console.error(`DB Error: ${errorMessage}`, err.message);
        throw createError(errorMessage, 500);
    }
};

// Custom typed error factory
export interface AppError extends Error {
  statusCode: number;
}

//Custom Error with statusCode (works with your global handler)
export const createError = (message:string, statusCode = 500):AppError => {
    const error = new Error(message) as AppError;
    error.statusCode = statusCode;
    return error;
};

//External service wrapper
export const serviceOperation = async <T>(operation:()=> Promise<T>, errorMessage:string): Promise<T> => {
    try {
        return await operation();
    } catch (error:unknown) {
                    const err = error as Error;
        console.error(`Service Error: ${errorMessage}`, err.message);
        throw createError(errorMessage, 500);
    }
};
