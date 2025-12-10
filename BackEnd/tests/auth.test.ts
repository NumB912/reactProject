import request from "supertest";
import { AuthenticationService } from "../src/service/authentication.service";

jest.mock("../src/service/authentication.service");
import app from "../src/app";
import { createAccessToken } from "@/utils/token";

describe("POST api/authentication/login", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should return 400 if email is missing", async () => {
    (AuthenticationService.login as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .post("/api/authentication/login")
      .set("Content-Type", "application/json")
      .send({ password: "123456" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});

describe("POST api/authentication/login", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should return 400 không tồn tại mật khẩu", async () => {
    (AuthenticationService.login as jest.Mock).mockResolvedValue(null);

    const res = await request(app)
      .post("/api/authentication/login")
      .set("Content-Type", "application/json")
      .send({ email: "mxpn1279@gmail.com" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});

describe("POST api/authentication/login", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should return 400 nếu mật khẩu không chính xác", async () => {
    (AuthenticationService.login as jest.Mock).mockResolvedValue({
      status: 400,
      message: "Email hoặc mật khẩu không đúng",
      success: false,
    });

    const res = await request(app)
      .post("/api/authentication/login")
      .set("Content-Type", "application/json")
      .send({ email: "mxpn1279@gmail.com", password: "123456" });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message");
  });
});

describe("POST /api/authentication/reset-password", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should return 400 nếu thiếu token hoặc mật khẩu mới", async () => {
    const res = await request(app)
      .post("/api/authentication/reset-password")
      .send({ newPassword: "" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Lỗi không lỗi người dùng");
  });

  it("should return 200 nếu đặt lại mật khẩu thành công", async () => {
    jest.spyOn(AuthenticationService, 'resetPassword').mockResolvedValue({
      status: 200,
      message: "Đặt lại mật khẩu thành công",
      success: true,
    });

    const res = await request(app)
      .post("/api/authentication/reset-password")
      .set("Authorization", "Bearer token123")
      .send({ newPassword: "newpass123" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Đặt lại mật khẩu thành công");
  });
});

describe("POST /api/authentication/mail-reset-password", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should return 200 nếu mail reset password gửi thành công", async () => {
    jest.spyOn(AuthenticationService, 'mailResetPassword').mockResolvedValue({
      status: 200,
      message: "Mail đặt lại mật khẩu đã được gửi",
      success: true,
    });

    const res = await request(app)
      .post("/api/authentication/mail-reset-password")
      .send({ email: "test@example.com" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Mail đặt lại mật khẩu đã được gửi");
  });

  it("should return 400 nếu email không tồn tại", async () => {
    jest.spyOn(AuthenticationService, 'mailResetPassword').mockResolvedValue({
      status: 400,
      message: "Email không tồn tại",
      success: false,
    });

    const res = await request(app)
      .post("/api/authentication/mail-reset-password")
      .send({ email: "nonexist@example.com" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Email không tồn tại");
  });
});


const token = createAccessToken({ sub: "user-id", jti: "jti123", type: "access" });
  describe("POST /api/authentication/logout", () => {
    it("should clear refresh_token cookie and return success", async () => {
      jest.spyOn(AuthenticationService, "logout").mockResolvedValue({
        status: 200,
        success: true,
        message: "Thành công",
      });

    const res = await request(app)
    .post("/api/authentication/logout")
    .set("Authorization", `Bearer ${token}`)
    .set("Cookie", ["refresh_token=token123"]);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Đăng xuất thành công");
      expect(res.body).toHaveProperty("success", true);
    });
    
  });


