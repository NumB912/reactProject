import { AuthenticationService } from "@/service/authentication.service";
import type { NextFunction, Request, Response } from "express";
import jwt, {type JwtPayload } from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Không có authorization" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Chưa cung cấp token" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    req.user = payload;
    return next(); 

  } catch (error: any) {

    if (
      error.name !== "TokenExpiredError" &&
      error.name !== "JsonWebTokenError"
    ) {
      return res.status(403).json({ message: "Token không hợp lệ" });
    }

    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Phiên hết hạn, vui lòng đăng nhập lại" });
    }


    const newTokens = await AuthenticationService.refreshAccessToken(
      refreshToken
    );

    if (!newTokens || !newTokens.access_token) {
      res.clearCookie("refresh_token");
      return res.status(401).json({ message: "Phiên đăng nhập đã hết hạn" });
    }


    if (newTokens.refresh_token) {
      res.cookie("refresh_token", newTokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }

    const decodedNew = jwt.verify(
      newTokens.access_token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = decodedNew;

    req.headers.authorization = `Bearer ${newTokens.access_token}`;

    return next();
  }
};
