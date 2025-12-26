import * as z from 'zod'
import mongoose from 'mongoose'
import createHttpError from 'http-errors'
import type { NextFunction, Request, Response } from 'express'


const objectIdSchema = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
  message: 'Invalid ObjectId format',
})

interface ValidateObjectIdParameters {
    paramName: string;
    type: 'params' | 'body' | 'query';
}

export const validateObjectId = ({paramName, type}:ValidateObjectIdParameters) => {
    return async (req:Request, res:Response, next:NextFunction) => {
        const ObjectId = req[type][paramName];
        if(!ObjectId) return next(createHttpError(400, `Missing objectId`));
        const result = objectIdSchema.safeParse(ObjectId);

        if(!result.success) {
            return res.status(400).json({error: `Invalid ObjectId`});
        }
        next();
    } 
}