import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../../../../API/api";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true); // đang kiểm tra token
  const [message, setMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);
  console.log(token)
  useEffect(() => {
    if (!token) {
      setMessage({
        type: "error",
        text: "Liên kết không hợp lệ. Vui lòng kiểm tra lại email.",
      });
      setVerifying(false);
      return;
    }


    const checkToken = async () => {
      try {
        await api.post("/authentication/verify-reset-token", { token });
        setVerifying(false);
      } catch (err: any) {
        const msg =
          err.response?.data?.message ||
          "Liên kết đã hết hạn hoặc không hợp lệ. Vui lòng gửi lại yêu cầu.";
        setMessage({ type: "error", text: msg });
        setVerifying(false);
      }
    };

    checkToken();
  }, [token]);

  const isValidPassword = password.length >= 6;
  const isMatch = password && confirmPassword && password === confirmPassword;
  const canSubmit = isValidPassword && isMatch && !loading && !verifying && token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || verifying) return;

    setMessage(null);
    setLoading(true);

    try {
      const res = await api.post("/authentication/reset-password", {
        newPassword:password,
      },{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });

      setMessage({
        type: "success",
        text: res.data.message || "Đặt lại mật khẩu thành công! Đang chuyển về đăng nhập...",
      });

      setTimeout(() => navigate("/"), 3000);
    } catch (err: any) {
      setMessage({
        type: "error",
        text:
          err.response?.data?.message ||
          "Không thể đặt lại mật khẩu. Liên kết có thể đã được sử dụng.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={6} sx={{ p: 5, borderRadius: 3, textAlign: "center" }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {message?.text || "Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn."}
          </Alert>
          <Button
            variant="contained"
            onClick={() => navigate("/forgot-password")}
            sx={{ mt: 2 }}
          >
            Gửi lại link đặt lại mật khẩu
          </Button>
          <Button
            variant="text"
            onClick={() => navigate("/login")}
            sx={{ mt: 2, ml: 2 }}
          >
            Quay lại đăng nhập
          </Button>
        </Paper>
      </Container>
    );
  }

  if (verifying) {
    return (
      <Container maxWidth="sm" sx={{ mt: 16, textAlign: "center" }}>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 3 }}>
          Đang xác thực liên kết...
        </Typography>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={6} sx={{ p: 5, width: "100%", borderRadius: 3 }}>
          <Typography component="h1" variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Đặt lại mật khẩu
          </Typography>

          <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
            Nhập mật khẩu mới để hoàn tất.
          </Typography>

          {message && (
            <Alert severity={message.type} sx={{ mb: 3, borderRadius: 2 }}>
              {message.text}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              required
              fullWidth
              name="password"
              label="Mật khẩu mới"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              helperText="Tối thiểu 6 ký tự"
              sx={{ mb: 3 }}
            />

            {/* Xác nhận mật khẩu */}
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              error={!!confirmPassword && !isMatch}
              helperText={confirmPassword && !isMatch ? "Mật khẩu không khớp" : " "}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={!canSubmit}
              sx={{
                mt: 4,
                py: 1.8,
                borderRadius: 2,
                fontSize: "1.1rem",
                textTransform: "none",
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                  Đang cập nhật...
                </>
              ) : (
                "Cập nhật mật khẩu mới"
              )}
            </Button>
          </Box>

          {message?.type === "success" && (
            <Typography color="success.main" textAlign="center" mt={3}>
              Sẽ tự động chuyển về trang đăng nhập trong giây lát...
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
}