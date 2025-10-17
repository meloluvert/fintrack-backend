import { Request, Response, NextFunction } from "express";
import { Payload } from "../models/interfaces/user/auth/Payload";
import { verify } from "jsonwebtoken";

export function isAuthenticated(request:Request, response: Response, next: NextFunction) {

    const authToken =  request.headers.authorization;
    if(!authToken){
        return response.status(401).json({ message: 'Accesso Negado, tente logar novamente' });
    }

    const [ , token] = authToken.split(" "); 

    try {
        const decoded = verify(token, process.env.JWT_SECRET as string) as Payload;   
        request.user_id = decoded.sub;
        return next()
    } catch (error) {
        return response.status(400).json({ message: 'Token Inválido, faça login novamente' });
        
    }
}