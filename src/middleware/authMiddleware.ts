import { config } from "../config/config.js"
import createHttpError from 'http-errors'
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { returnResponse } from "../utilis/returnResponse.js";
import type { NextFunction, Request, Response } from "express";

const publicKeyBase64: string = config.get("JWT_PUBLIC_KEY");
const publicKey: string = Buffer.from(publicKeyBase64, 'base64').toString('utf-8');
const environment: string = config.get("NODE_ENVIRONMENT");

interface AuthenticatedRequest extends Request {
    user: {
        gmail: string;
    };
}

interface DecodedToken extends JwtPayload {
    userInfo: {
        userEmail: string;
    };
}
const verifyAuthStatus = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return returnResponse("No Token is provided", res, 400);
        }

        // Verify token
        const decoded = jwt.verify(token, publicKey, {
            algorithms: ["RS256"]
        }) as DecodedToken;

        if (!decoded || typeof decoded === "string" || !('userInfo' in decoded)) return next(createHttpError(400, "You're unauthorized to access this resource"));

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
        const err = error as Error;
        console.error("Auth middleware error:", err.message);
        return next(createHttpError(500, "Internal server error"));
    }
};


export const optionalAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (environment === "development" && config.get("BYPASS_AUTH") === 'true') {
        req.user = {
            gmail: config.get("TEST_USER_EMAIL")
        }
        return next();
    }
    return verifyAuthStatus(req, res, next);
}