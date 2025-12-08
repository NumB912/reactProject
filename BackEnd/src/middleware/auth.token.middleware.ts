// middleware/auth.middleware.ts
import { AuthenticationService } from "@/service/authentication.service";
import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: JwtPayload & { sub: string; email?: string; role?: string };
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  if (accessToken) {
    try {
      const payload = jwt.verify(accessToken, process.env.JWT_SECRET!) as JwtPayload;
      req.user = payload;
      return next(); 
    } catch (error: any) {
      if (error.name !== "TokenExpiredError" && error.name !== "JsonWebTokenError") {
        return res.status(401).json({ message: "Token không hợp lệ" });
      }
    }
  }

  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Phiên hết hạn, vui lòng đăng nhập lại",
    });
  }

  try {
    const newTokens = await AuthenticationService.refreshAccessToken(refreshToken);

    if (!newTokens?.access_token) {
      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });
      return res.status(401).json({ message: "Phiên hết hạn hoàn toàn" });
    }

    if (newTokens.refresh_token) {
      res.cookie("refresh_token", newTokens.refresh_token, {
        httpOnly: true,
        secure: true, 
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }

    const payload = jwt.verify(newTokens.access_token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = payload;


    // req.headers.authorization = `Bearer ${newTokens.access_token}`;
    res.setHeader("X-New-Access-Token", newTokens.access_token);



    const originalJson = res.json;
    res.json = function (data: any) {
      return originalJson.call(this, {
        ...data,
        ...(typeof data === "object" && data && !data.user && !data.data ? { access_token: newTokens.access_token } : {}),
      });
    };

    return next(); 

  } catch (error) {
    console.error("Refresh token failed:", error);
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    return res.status(401).json({
      success: false,
      message: "Phiên đăng nhập hết hạn",
    });
  }
};