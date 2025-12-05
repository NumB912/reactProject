import nodemailer, { type Transporter } from "nodemailer";

export interface Emailoptions {
  to: string | string[];
  from?:string,
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    path?: string;
    content?: string | Buffer;
  }>;
}

export class EmailService {
  private transporter: Transporter;
  private from: string;

  constructor(from?:string) {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailFrom = process.env.EMAIL_FROM;
    if (!emailUser || !emailPass) {
      throw new Error("EMAIL_USER and EMAIL_PASS must be provided in .env");
    }

    this.from = from || emailFrom || emailUser;

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass, 
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    this.verifyConnection();
  }

  private async verifyConnection(): Promise<void> {
    try {
      await this.transporter.verify();
      console.log("✅ Email server đã kết nối");
    } catch (error) {
      console.error("Email connection failed:", error);
    }
  }

  async sendEmail(options: Emailoptions): Promise<any> {

    const mailoptions = {
      from: options.from||this.from,
      to: Array.isArray(options.to) ? options.to.join(",") : options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    };

    try {
      const info = await this.transporter.sendMail(mailoptions);
      return info;
    } catch (error: any) {
      console.error("Send email failed:", error.message);
      throw new Error(`Gửi email thất bại: ${error.message}`);
    }
  }


  async sendResetPasswordEmail(to: string, resetToken: string, expiresInMinutes: number = 15) {
    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    
    const expiresTime = new Date(Date.now() + expiresInMinutes * 60 * 1000);
    const formattedTime = expiresTime.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #d93025; text-align: center;">Đặt lại mật khẩu</h2>
        <p>Xin chào,</p>
        <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" 
            style="
              display: inline-block;
              padding: 14px 32px;
              background: #d93025;
              color: white;
              font-weight: bold;
              text-decoration: none;
              border-radius: 8px;
              font-size: 16px;
            ">
            Đặt lại mật khẩu ngay
          </a>
        </div>

        <p><strong>Lưu ý quan trọng:</strong></p>
        <ul>
          <li>Link này chỉ có hiệu lực trong <strong>${expiresInMinutes} phút</strong> (đến <strong>${formattedTime}</strong>).</li>
          <li>Nếu bạn <strong>không yêu cầu</strong>, vui lòng <strong>bỏ qua email này</strong> và <strong>đổi mật khẩu ngay</strong> nếu nghi ngờ tài khoản bị xâm phạm.</li>
          <li>Không chia sẻ link này với bất kỳ ai.</li>
        </ul>

        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #888; font-size: 12px; text-align: center;">
          Email được gửi tự động từ <strong>My App</strong>. Vui lòng không trả lời.
          <br>
          © 2025 My App. All rights reserved.
        </p>
      </div>
    `;

    await this.sendEmail({
      to,
      subject: `Đặt lại mật khẩu - Hết hạn lúc ${formattedTime}`,
      html,
    });
  }

  async sendWelcomeEmail(to: string, name: string) {
    await this.sendEmail({
      to,
      subject: "Chào mừng bạn đến với ứng dụng của chúng tôi!",
      html: `
        <h2>Xin chào ${name}!</h2>
        <p>Cảm ơn bạn đã đăng ký tài khoản.</p>
        <p>Chúc bạn trải nghiệm vui vẻ!</p>
        <br>
        <p>Team <strong>My App</strong></p>
      `,
    });
  }

  
}
