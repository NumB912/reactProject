import redisClient from "@/config/redis.config";
import type { NextFunction, Request, Response } from "express";

async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];   
    if (!token) {
        return res.status(401).json({ message: 'Token không được cung cấp' });
    }

        const bearerToken = token.split(' ')[1]; 
        const email = req.body.email || req.query.email;

        const verify = await redisClient.hGetAll(`token:${email}`);
        
        if (!verify || verify.token !== bearerToken) {
            return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
        }

        if (Date.now() - parseInt(verify.create_at) > 5 * 60 * 1000) {
            return res.status(401).json({ message: 'Token đã hết hạn' });
        }

        

    try {
    } catch (error) {
      return res.status(401).json({ message: 'Token không hợp lệ' });
    }  
    next();
}