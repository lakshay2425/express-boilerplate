import { config } from "../config/config.js"
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { returnResponse } from "../utilis/returnResponse.js";

const verifyAuthStatus = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return returnResponse("No Token is provided", res, 400);
        }

        const publicKeyBase64 = config.get("JWT_PUBLIC_KEY");
        const publicKey = Buffer.from(publicKeyBase64, 'base64').toString('utf-8');

        
        // Verify token
        const decoded = jwt.verify(token, publicKey,{
            algorithms: ["RS256"]
        });

        if(!decoded) return next(createHttpError(400, "Failed to decoded the token"))

            // Add user info to request object
        req.user = {
            gmail: decoded.userInfo.userEmail
        };

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return next(createHttpError(401, "Token has expired, please login again"));
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return next(createHttpError(401, "Invalid token, please login again"));
        }
        console.error("Auth middleware error:", error.message);
        return next(createHttpError(500, "Internal server error"));
    }
};


export const optionalAuth = async (req, res, next) => {
    const environment = config.get("NODE_ENVIRONMENT");
    if(environment === "development" && config.get("BYPASS_AUTH") === 'true'){
        req.user = {
            gmail: config.get("TEST_USER_EMAIL")
        }
        return next();
    }
    return verifyAuthStatus(req,res,next);
}