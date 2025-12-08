import jwt, { type JwtPayload } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
export const createAccessToken = (payload:any) => {
  return jwt.sign(payload, JWT_SECRET as string, {
    expiresIn: "1m",
  });
};

export const createRefreshToken = (payload:any) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET as string, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = async (refreshToken: string) => {
  try {
    if (!refreshToken) {
      throw new Error("Refresh token not provided");
    }

    const decoded = jwt.verify(
      refreshToken,
      JWT_REFRESH_SECRET as string
    ) as JwtPayload;
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error?.name === "TokenExpiredError",
      message: error?.message,
    };
  }
};