import prisma from "../db";
import bcrypt from "bcryptjs";
import { EmailService } from "./email.Service";
import { compareHash, hash, hashToken } from "@/utils/hash.utils";
import { Role } from "@/enum/role.enum";
import { getRedis } from "@/config/redis.config";
import { randomUUID } from "crypto";
import type { ErrorResponse, SuccessResponse } from "@/model/api.model";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "@/utils/token";
import { status } from "@/enum/user.enum";

const JWT_SECRET = process.env.JWT_SECRET;
export class AuthenticationService {
  static async login(
    email: string,
    password: string
  ): Promise<
    | SuccessResponse<{
        role: string;
        user_id: String;
        access_token: String;
        refresh_token: String;
        expires_in: number;
      }>
    | ErrorResponse
  > {
    try {
      if (!email) {
        return {
          status: 400,
          message: "Email hoặc mật khẩu không đúng",
          success: false,
        };
      }

      const user = await prisma.person.findUnique({
        where: { email: email },
        select: {
          id: true,
          password: true,
          role: {
            select: {
              name: true,
            },
          },
        },
      });

      let isPasswordValid = false;

      if (user && user.password) {
        isPasswordValid = await bcrypt.compare(password, user.password);
      } else {
        await bcrypt.compare(
          password,
          "$2a$10$invalidhashforsecuritypurpose12345678901234567890"
        );
      }
      if (!user || !isPasswordValid) {
        return {
          status: 400,
          message: "Email hoặc mật khẩu không đúng",
          success: false,
        };
      }

      const userId = user.id.toString();
      const role = user.role.name.toString();
      const accessJti = randomUUID();

      const accessToken = createAccessToken({
        sub: userId,
        jti: accessJti,
        type: "access",
      });

      await getRedis().set(`at:jti:${accessJti}`, userId, {
        EX: 15 * 60,
      });

      const refreshToken = createRefreshToken({
        sub: userId,
      });

      const tokenFamily = randomUUID();

      await prisma.refreshToken.create({
        data: {
          userId: userId,
          tokenHash: refreshToken,
          family: tokenFamily,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          ip: "",
          ua: "",
        },
      });

      return {
        data: {
          role: role,
          user_id: userId,
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: 15 * 60,
        },
        status: 200,
        success: true,
        message: "Đăng nhập thành công",
      };
    } catch (error) {
      return {
        status: 401,
        message: "Email hoặc mật khẩu không đúng",
        success: false,
      };
    }
  }

  static async logout(refresh_token: string, user: any) {
    try {
      const payload = user;
      const key_load = `at:jti:${payload.jti}`;
      await getRedis().del(key_load);


      const deleteRefeshToken = await prisma.refreshToken.deleteMany({
        where: {
          tokenHash: refresh_token,
        },
      });

      if (!deleteRefeshToken) {
        return {
          status: 500,
          success: false,
          message: "Không thành công",
        };
      }

      return {
        status: 200,
        success: true,
        message: "Thành công",
      };
    } catch (error) {
      return {
        status: 500,
        success: false,
        message: "Không thành công",
      };
    }
  }

  // static async loginWithGoogle(token: string) {
  //   try {
  //     const client = new OAuth2Client(CLIENT_ID);
  //     const ticket = await client.verifyIdToken({
  //       idToken: token,
  //       audience: CLIENT_ID,
  //     });

  //     const payload = ticket.getPayload();
  //     if (!payload) {
  //       return { success: false, message: "Invalid Google token payload" };
  //     }
  //     if (!payload.email_verified) {
  //       return { success: false, message: "Email chưa được Google xác minh" };
  //     }

  //     const { sub: googleId, email, name } = payload;

  //     if (!email) {
  //       return { success: false, message: "Không lấy được email từ Google" };
  //     }

  //     let user = await prisma.person.findFirst({
  //       where: { google_id: googleId },
  //     });

  //     if (!user) {
  //       user = await prisma.person.create({
  //         data: {
  //           google_id: googleId,
  //           email: email.toLowerCase(),
  //           name: name || email.split("@")[0],
  //           role_id: Role.ROLE_USER,
  //           create_at: new Date(),
  //           update_at: new Date(),
  //           password: "",
  //         },
  //       });
  //     } else {
  //       user = await prisma.person.update({
  //         where: { id: user.id },
  //         data: {
  //           name: name || user.name,
  //           update_at: new Date(),
  //         },
  //       });
  //     }

  //     const jwtToken = jwt.sign(
  //       {
  //         userId: user.id,
  //         email: user.email,
  //         name: user.name,
  //         role_id: user.role_id,
  //       },
  //       JWT_SECRET as string,
  //       { expiresIn: "15m" }
  //     );
  //     const { password, ...safeUser } = user;

  //     return {
  //       success: true,
  //       token: jwtToken,
  //       user: safeUser,
  //       message: "Đăng nhập Google thành công",
  //     };
  //   } catch (error: any) {
  //     console.error("Google OAuth Error:", error.message || error);

  //     if (error.message?.includes("Token used too late")) {
  //       return { success: false, message: "Token đã hết hạn" };
  //     }
  //     if (error.message?.includes("Invalid token")) {
  //       return { success: false, message: "Token không hợp lệ" };
  //     }

  //     return { success: false, message: "Xác thực Google thất bại" };
  //   }
  // }

  static async isExistEmail(email: string) {
    if (email.length == 0) {
      return false;
    }

    try {
      const findEmail = await prisma.person.findUnique({
        where: { email },
      });

      if (findEmail) {
        return true;
      }

      return false;
    } catch (error) {
      console.error("error", error);
    }
  }

  static async signup(
    email: string,
    password: string,
    name: string,
    phone: string
  ): Promise<
    | { success: true; status: number; userId: string; message: string }
    | { success: false; message: string; status: number }
  > {
    try {
      const token = await getRedis().get(`token_register:${email}`);

      if (!token) {
        return {
          success: false,
          status: 400,
          message: "Hết hạn để đăng ký vui lòng thử lại",
        };
      }

      const normalizedEmail = email.trim().toLowerCase();
      const trimmedName = name.trim();
      const trimmedPhone = phone.trim();
      const existingUser = await prisma.person.findUnique({
        where: { email: normalizedEmail },
        select: { id: true },
      });

      if (existingUser) {
        return {
          success: false,
          message:
            "Email này đã được đăng ký. Vui lòng đăng nhập hoặc dùng chức năng quên mật khẩu.",
          status: 409,
        };
      }

      const hashedPassword = await hash(password);
      const newUser = await prisma.person.create({
        data: {
          email: normalizedEmail,
          password: hashedPassword,
          name: trimmedName,
          phone: trimmedPhone,
          role_id: Role.ROLE_USER,
          create_at: new Date(),
          status: status.ACTIVE,
        },
        select: {
          id: true,
        },
      });

      if (!newUser) {
        return {
          success: false,
          message: "Đăng ký không thành công. Vui lòng thử lại sau.",
          status: 500,
        };
      }

      const emailService = new EmailService();
      await emailService.sendWelcomeEmail(normalizedEmail, trimmedName);

      return {
        success: true,
        userId: newUser.id,
        status: 201,
        message: "Đăng ký thành công",
      };
    } catch (error: any) {
      if (error.code === "P2002" && error.meta?.target?.includes("email")) {
        return {
          success: false,
          message: "Email đã được sử dụng, vui lòng thử lại sau vài giây.",
          status: 409,
        };
      }

      console.error("Signup error:", error);
      return {
        success: false,
        message: "Đã có lỗi hệ thống. Vui lòng thử lại sau.",
        status: 500,
      };
    }
  }

  static async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string; status: number }> {
    try {
      const resetToken = token;
      const userId = await getRedis().get(`pwd-reset:${resetToken}`);
      if (!userId) {
        return {
          success: false,
          message: "Không tồn tại",
          status: 400,
        };
      }

      const user = await prisma.person.findUnique({
        where: { id: userId },
        select: { password: true },
      });
      if (!user) {
        return {
          success: false,
          message: "Người dùng không tồn tại",
          status: 404,
        };
      }

      const isCompare = await bcrypt.compare(newPassword, user.password);

      const hashedNewPassword = await hash(newPassword);

      if (isCompare) {
        return {
          success: false,
          message: "Mật khẩu mới không được trùng với mật khẩu cũ",
          status: 400,
        };
      }

      const isResetPasswordSuccess = await prisma.person.update({
        where: { id: userId },
        data: { password: hashedNewPassword },
      });

      if (!isResetPasswordSuccess) {
        return {
          success: false,
          message: "Đặt lại mật khẩu không thành công, vui lòng thử lại sau",
          status: 500,
        };
      }

      const deleteToken = await getRedis().del(`pwd-reset:${resetToken}`);

      return {
        success: true,
        message: "Đặt lại mật khẩu thành công",
        status: 200,
      };
    } catch (error) {
      console.error("resetPassword error:", error);
      return {
        success: false,
        message: "Đã có lỗi hệ thống. Vui lòng thử lại sau.",
        status: 500,
      };
    }
  }

  static async mailResetPassword(email: string) {
    try {
      const user = await prisma.person.findUnique({ where: { email } });
      if (!user) {
        return {
          success: false,
          message: "Email không tồn tại",
          status: 404,
        };
      }

      const resetToken = createAccessToken({ email: email, user_id: user.id });
      const redisKey = `pwd-reset:${resetToken}`;
      await getRedis().set(redisKey, user.id, {
        EX: 15 * 60,
      });

      const emailService = new EmailService();

      await emailService.sendResetPasswordEmail(email, resetToken, 15);

      return {
        success: true,
        message: "Đã gửi email đặt lại mật khẩu",
        status: 200,
      };
    } catch (error) {
      console.log("lỗi đăng ký", error);

      return {
        success: false,
        message: "Lỗi vui lòng thực hiện lại",
        status: 500,
      };
    }
  }

  static async verifyTokenResetPassword(token: string) {
    try {
      const tokenVerify = await getRedis().get(`pwd-reset:${token}`);
      if (!tokenVerify) {
        return {
          message: "Không tồn tại token hoặc hết hạn",
          status: 401,
          success: false,
        };
      }

      return {
        message: "Tồn tại",
        status: 200,
        success: true,
      };
    } catch (error) {
      return {
        message: "Lỗi trong quá trình thực hiện",
        status: 500,
        success: false,
      };
    }
  }
  static async refreshAccessToken(refresh_token: string) {
    try {
      if (!refresh_token) {
        return {
          message: "Lỗi",
          success: false,
        };
      }

      const id = await prisma.refreshToken.findUnique({
        where: {
          tokenHash: refresh_token,
        },
        select: {
          person: {
            select: {
              email: true,
              id: true,
            },
          },
        },
      });

      if (!id) {
        return {
          message: "Lỗi khong ton tai refesh token",
          success: false,
        };
      }

      const verifyRefresh = await verifyRefreshToken(refresh_token);

      if (!verifyRefresh.valid) {
        throw new Error(
          verifyRefresh.expired
            ? "Refresh token expired"
            : "Invalid refresh token"
        );
      }
      const decoded = verifyRefresh.decoded;
      if (!decoded) {
        return {
          message: "Lỗi trong quá trình thực thi",
        };
      }
      const userId = await id.person.id;
      const accessJti = randomUUID();
      const accessToken = createAccessToken({
        sub: userId,
        jti: accessJti,
        type: "access",
      });

      return {
        success: true,
        access_token: accessToken,
        refresh_token: refresh_token,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
