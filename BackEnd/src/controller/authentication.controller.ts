import type { Request, Response } from "express";
import { AuthenticationService } from "@/service/authentication.service.js";
import { OtpService } from "@/service/otp.service";
import jwt from "jsonwebtoken";
import redisClient from "@/config/redis.config";
const JWT_SECRET = process.env.JWT_SECRET!;

class AuthenticationController {
  static async register(req: Request, res: Response) {
    let { email, password, name, phone } = req.body;
    try {
      const signUp = await AuthenticationService.signup(
        email,
        password,
        name,
        phone
      );

      return res.status(signUp.status).json(signUp);
    } catch (error: any) {
      console.error(
        "lỗi trong quá trình đăng ký vui lòng thử lại",
        error.message
      );

      return res.status(500).json({
        message: "Lỗi trong quá trình đăng ký vui lòng thử lại",
      });
    }
  }

  static async checkEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email || typeof email !== "string" || !email.trim()) {
        return res.status(400).json({
          status: 400,
          message: "Email không hợp lệ",
        });
      }

      const normalizedEmail = email.trim().toLowerCase();
      const isEmailExist = await AuthenticationService.isExistEmail(
        normalizedEmail
      );

      if (isEmailExist) {
        return res.status(400).json({
          status: 400,
          available: false,
          message: "Email đã được sử dụng",
        });
      }

      const sendResult = await OtpService.sendOtp(normalizedEmail);

      if (!sendResult.success) {
        return res.status(500).json({
          status: 500,
          message: "Không thể gửi mã xác nhận lúc này, vui lòng thử lại sau",
        });
      }

      return res.json({
        status: 200,
        available: true,
        message:
          "Email có thể dùng để đăng ký. Mã OTP đã được gửi đến email của bạn",
      });
    } catch (error) {
      console.error("Lỗi kiểm tra email:", error);
      return res.status(500).json({
        status: 500,
        message: "Lỗi hệ thống, vui lòng thử lại sau",
      });
    }
  }

  static async otpVerify(req: Request, res: Response) {
    const { otp, email } = req.body;
    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        status: 400,
        message: "Email không hợp lệ",
      });
    }

    if (!otp || typeof otp != "string") {
      return res.status(400).json({
        status: 400,
        message: "otp không hợp lệ",
      });
    }

    try {
      const verify = await OtpService.verifyOtp(otp, email);

      if (!verify.success) {
        return res.status(verify.status).json({
          status: verify.status,
          message: verify.message,
        });
      }

      const token_register = jwt.sign(
        {
          email: email,
        },
        JWT_SECRET,
        { expiresIn: "5m" }
      );

      const redis = await redisClient.set(
        `token_register:${email}`,
        token_register
      );

      return res.status(200).json({
        verify,
        token_register,
      });
    } catch (error) {
      console.error("Lỗi kiểm tra email:", error);
      return res.status(500).json({
        status: 500,
        message: "Lỗi hệ thống, vui lòng thử lại sau",
      });
    }
  }
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({
        status: 400,
        message: "Email không hợp lệ",
      });
    }
    if (!password || typeof password !== "string" || !password.trim()) {
      return res.status(400).json({
        status: 400,
        message: "Mật khẩu không hợp lệ",
      });
    }

    try {
      const login = await AuthenticationService.login(email, password);

      if (!login.success) {
        return res.status(login.status).json({
          status: login.status,
          message: login.message,
        });
      }

      res.cookie("refresh_token", login.data.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({
        user_id: login.data.user_id,
        access_token: login.data.access_token,
        expires_in: login.data.expires_in,
        message: login.message,
        status: login.status,
        success: login.success,
      });
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      return res.status(500).json({
        status: 500,
        message: "Lỗi hệ thống, vui lòng thử lại sau",
      });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    const { newPassword } = req.body;
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    try {
      if(!token || !newPassword){
        return res.status(400).json({
          success:false,
          message:"Lỗi không lỗi người dùng"
        })
      }


      const reset = await AuthenticationService.resetPassword(
        token as string,
        newPassword as string
      );
      res.status(reset.status).json(reset);
    } catch (error) {
      console.error("Lỗi trong quá trình đặt lại mật khẩu:", error);
      return res.status(500).json({
        status: 500,
        message: "Lỗi hệ thống, vui lòng thử lại sau",
      });
    }
  }

  static async mailResetPassword(req: Request, res: Response) {
    const { email } = req.body;

    try {
      const mail = await AuthenticationService.mailResetPassword(
        email as string
      );
      res.status(mail.status).json(mail);
    } catch (error) {
      console.error("Lỗi trong quá trình gửi mail đặt lại mật khẩu:", error);
      return res.status(500).json({
        status: 500,
        message: "Lỗi hệ thống, vui lòng thử lại sau",
      });
    }
  }

  static async googleLogin(req: Request, res: Response) {
    const { tokenId } = req.query;
    try {
      const googleLogin = await AuthenticationService.loginWithGoogle(
        tokenId as string
      );
      res.json(googleLogin);
    } catch (error) {
      console.error("Lỗi trong quá trình đăng nhập bằng Google:", error);
      return res.status(500).json({
        status: 500,
        message: "Lỗi hệ thống, vui lòng thử lại sau",
      });
    }
  }

  static async logout(req: Request, res: Response) {
    try {

      const refreshToken = req.cookies.refresh_token;
      const payload = req.user

      console.log(payload)

      if (refreshToken && payload) {
        await AuthenticationService.logout(refreshToken, payload);
      }

      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
      });

      return res.json({
        message: "Đăng xuất thành công",
        success: true,
      });
    } catch (error: any) {
      console.error("Lỗi logout:", error);

      try {
        res.clearCookie("refresh_token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          path: "/",
        });
      } catch (clearError) {
        console.error("Không thể xóa cookie:", clearError);
      }

      return res.status(500).json({
        message: "Lỗi hệ thống khi đăng xuất",
        error: error.message || "Unknown error",
      });
    }
  }

  static async verifyToken(req: Request, res: Response) {
    const { token } = req.body;
    try {

      const verify = await AuthenticationService.verifyTokenResetPassword(token)

      res.status(verify.status).json(verify)
    } catch (error) {
      console.error("Lỗi trong quá trình đăng nhập bằng Google:", error);
      return res.status(500).json({
        status: 500,
        message: "Lỗi hệ thống, vui lòng thử lại sau",
      });
    }
  }



}

export default AuthenticationController;
