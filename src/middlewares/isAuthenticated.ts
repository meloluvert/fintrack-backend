import { Request, Response, NextFunction } from "express";
import { Payload } from "../models/interfaces/user/auth/Payload";
import { verify } from "jsonwebtoken";

export function isAuthenticated(request:Request, response: Response, next: NextFunction) {

    const authToken =  request.headers.authorization;
    if(!authToken){
        return response.status(401).end({ message: 'Access Negado' });
    }

    const [ , token] = authToken.split(" ")

    try {
        const decoded = verify(token.split(' ')[1], process.env.JWT_SECRET as string) as Payload;
        request.user_id = decoded.sub;
        return next()
    } catch (error) {
        response.status(400).json({ message: 'TOken Inválido, faça login novamente' });
        
    }
}