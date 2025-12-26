import type { Response } from "express";

//Function to return error/success response
export const returnResponse = (message:string,  res:Response, statusCode:number, additionalFields:object={})=>{
    return res.status(statusCode).json({
        success: true,
        message: message,
        ...additionalFields
    })
}
