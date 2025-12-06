// middleware/arrayQuery.ts
import type { Request, Response, NextFunction } from 'express';

export const arrayQueryMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const query = req.query;

  Object.keys(query).forEach(key => {
    const value = query[key];

    if (key.endsWith('[]')) {
      if (value === undefined) {
        query[key.slice(0, -2)] = [];
      } else if (Array.isArray(value)) {
        query[key.slice(0, -2)] = value;
      } else {
        query[key.slice(0, -2)] = [value as string];
      }
      delete query[key]; 
    }
    
    else if (['type_hotel', 'category', 'tag', 'role'].includes(key)) {
      query[key] = Array.isArray(value) ? value : value ? [value as string] : [];
    }
  });

  next();
};