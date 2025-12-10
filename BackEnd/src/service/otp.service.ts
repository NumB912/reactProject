import { EmailService } from "./email.Service";
import { getRedis }  from "@/config/redis.config"; "@/config/redis.config";
import Jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRES = process.env.JWT_SECRET
export class OtpService {
  static generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static async verifyOtp(
  otp: string,
  email: string
): Promise<
  | { email: string; status: number; success: boolean ,message:string}
  | { success: boolean; message: string; status: number }
> { 


const stored = await getRedis().hGet(`otp:${email.toLowerCase()}`, 'otp');
  console.log(stored)
  const attempts = await getRedis().get(`opt-attempts:${email.toLowerCase()}`);

  if (!stored) {
    return {
      success: false,
      message: "Mã OTP không hợp lệ hoặc đã hết hạn",
      status: 400,
    };
  }

  if((attempts && Number(attempts) >= 5)){
    return {
      message:"Bạn đã thử quá 5 lần vui lòng thử lại sau",
      status:405,
      success:false
    }
  }

  if (otp !== stored) {
    await getRedis().incr(`opt-attempts:${email.toLowerCase()}`);

    return {
      success: false,
      message: "OTP không đúng",
      status: 400,
    };
  }

  await getRedis().del(`otp:${email}`);
  await getRedis().del(`opt-attempts:${email}`);

  return {
    message:"Thành công",
    email,
    status: 200,
    success: true,
  };
}

  static async storeRedisOtp(email: string, otp: string) {
    await getRedis().del(`otp:${email}`);
    await getRedis().del(`opt-attempts:${email}`)
    await getRedis().hSet(`otp:${email}`, {
      otp: otp,
      create_at: Date.now().toString(),
    });
    await getRedis().incr(`opt-attempts:${email}`);
    await getRedis().expire(`otp:${email}`, 120);
  }

  static async sendOtp(
    email: string
  ): Promise<{ success: boolean; message: string }> {
    if (!email?.trim()) {
      return { success: false, message: "Email không hợp lệ" };
    }

    try {
      const otp = this.generateOtp();
      console.log(otp)
      await this.storeRedisOtp(email, otp);
      await this.sendOtpEmail(email, otp);
      return { success: true, message: "Đã gửi OTP thành công" };
    } catch (error) {
      console.error("Lỗi gửi OTP:", error);
      return { success: false, message: "Gửi OTP thất bại" };
    }
  }

  static async sendOtpEmail(
    to: string,
    otp: string,
    expiresInMinutes: number = 5
  ) {
    const emailService = new EmailService();
    const subject = `Mã OTP xác nhận email của bạn: ${otp}`;
    const expiresTime = new Date(Date.now() + expiresInMinutes * 60 * 1000);
    const formattedTime = expiresTime.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #1a73e8; text-align: center;">Xác nhận email</h2>
      <p>Xin chào,</p>
      <p>Mã OTP của bạn là:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <span style="
          display: inline-block;
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 8px;
          padding: 12px 24px;
          background: #1a73e8;
          color: white;
          border-radius: 8px;
          font-family: monospace;
        ">
          ${otp}
        </span>
      </div>

      <p><strong>Lưu ý:</strong></p>
      <ul>
        <li>Mã này chỉ có hiệu lực trong <strong>${expiresInMinutes} phút</strong> (đến <strong>${formattedTime}</strong>).</li>
        <li>Không chia sẻ mã này với bất kỳ ai, kể cả nhân viên hỗ trợ.</li>
        <li>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</li>
      </ul>

      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="color: #888; font-size: 12px; text-align: center;">
        Email được gửi tự động từ <strong>My App</strong>. Vui lòng không trả lời.
      </p>
    </div>
  `;

    await emailService.sendEmail({
      to,
      subject,
      html,
    });
  }
}
