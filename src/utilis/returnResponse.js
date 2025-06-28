//Function to return error/success response
export const returnResponse = (message, type, res, statusCode, additionalFields={})=>{
    return res.status(statusCode).json({
        success: type == "success",
        message: message,
        ...additionalFields
    })
}
