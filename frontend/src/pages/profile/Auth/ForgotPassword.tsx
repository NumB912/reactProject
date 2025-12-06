import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ModalStep } from "./AuthModal";
import api from "../../../../API/api"; // điều chỉnh đường dẫn nếu cần

interface ForgotPasswordProp {
  setStep: (type: ModalStep) => void;
}

export const ForgotPassword = ({ setStep }: ForgotPasswordProp) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!validateEmail(email)) {
      setMessage({ type: "error", text: "Vui lòng nhập email hợp lệ" });
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/authentication/mail-reset-password", {
        email: email.toLowerCase().trim(),
      });

      console.log(res)

      setMessage({
        type: "success",
        text: res.data.message || "Đã gửi liên kết đặt lại mật khẩu đến email của bạn!",
      });
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        "Không thể gửi email. Vui lòng kiểm tra lại hoặc thử lại sau.";
      setMessage({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box position="relative">

      <Box textAlign="center" mb={4} mt={2}>
        <Typography variant="h5" fontWeight="bold">
          Quên mật khẩu?
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Nhập email của bạn, chúng tôi sẽ gửi link đặt lại mật khẩu.
        </Typography>
      </Box>
      {message && (
        <Alert severity={message.type} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      <Box component="form" onSubmit={handleForgotPassword}>
        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
          <InputLabel htmlFor="forgot-email">Email của bạn</InputLabel>
          <OutlinedInput
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoFocus
            disabled={loading}
            label="Email của bạn"
          />
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading || !validateEmail(email)}
          sx={{ py: 1.5, mb: 2 }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
              Đang gửi...
            </>
          ) : (
            "Gửi link đặt lại"
          )}
        </Button>

        <Typography textAlign="center" variant="body2" color="text.secondary">
          Nhớ ra rồi?{" "}
          <Button
            onClick={() => setStep("loginEmail")}
            sx={{ textTransform: "none", fontWeight: 600, p: 0, minWidth: "auto" }}
          >
            Đăng nhập ngay
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};