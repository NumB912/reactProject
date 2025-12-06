import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ModalStep } from "./AuthModal";
import api from "../../../../API/api";

interface RegisterEmailOnlyProps {
  setStep: (step: ModalStep) => void;
  setEmail: (email: string) => void;
  email: string;
}

const RegisterEmailOnly: React.FC<RegisterEmailOnlyProps> = ({
  setStep,
  setEmail,
  email,
}) => {
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleEmailChange = (value: string) => {
    setServerError("");
    if (value && !validateEmail(value)) {
      setEmailError("Vui lòng nhập email hợp lệ");
    } else {
      setEmailError("");
    }

    setEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setEmailError("");

    if (!email || !validateEmail(email)) {
      setEmailError("Vui lòng nhập email hợp lệ");
      return;
    }

    setLoading(true);
    const register = await api
      .post("/authentication/check-email", {
        email: email,
      })
      .then((res) => {
        setEmail(email)
        setStep("Otp_Email")
      })
      .catch((error) => {
        setServerError(error.response.data.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isDisabled = loading || !!emailError || !email;

  return (
    <Box position="relative">
      <Box textAlign="center" mb={4}>
        <Typography variant="h5" fontWeight="bold" textAlign={"left"}>
          Đăng ký tài khoản
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mt={1}
          textAlign={"left"}
        >
          Nhập email để nhận mã xác minh
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <FormControl
          fullWidth
          variant="outlined"
          sx={{ mb: emailError ? 1 : 3 }}
        >
          <InputLabel htmlFor="email-only">Địa chỉ email</InputLabel>
          <OutlinedInput
            id="email-only"
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="you@example.com"
            required
            autoFocus
            error={!!emailError}
            label="Địa chỉ email"
          />
          {emailError && (
            <Typography
              variant="caption"
              color="error"
              sx={{ mt: 0.5, ml: 1.5 }}
            >
              {emailError}
            </Typography>
          )}
        </FormControl>
        {serverError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {serverError}
          </Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isDisabled}
          sx={{ py: 1.5, mb: 3 }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Đang gửi mã...
            </>
          ) : (
            "Tiếp tục"
          )}
        </Button>

        <Typography textAlign="center" variant="body2" color="text.secondary">
          Đã có tài khoản?{" "}
          <Button
            onClick={() => setStep("loginEmail")}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Đăng nhập
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterEmailOnly;
