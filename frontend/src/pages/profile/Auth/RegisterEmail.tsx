import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ModalStep } from "./AuthModal";
import api from "../../../../API/api";

interface RegisterEmailProps {
  setStep: (step: ModalStep) => void;
  setPassword: (password: string) => void;
  setEmail: (email: string) => void;
  password: string;
  email: string;
} 

const RegisterEmail = ({
  setStep,
  setEmail,
  setPassword,
  email,
  password,
}: RegisterEmailProps) => {
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState("")
  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleNameChange = (value: string) => {
    setName(value);
    if (!value.trim()) {
      setNameError("Vui lòng nhập tên của bạn");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (!value) {
      setEmailError("Vui lòng nhập email");
    } else if (!validateEmail(value)) {
      setEmailError("Email không hợp lệ");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value.length < 6) {
      setPasswordError("Mật khẩu phải từ 6 ký tự trở lên");
    } else {
      setPasswordError("");
    }

    // Kiểm tra xác nhận mật khẩu nếu đã nhập
    if (confirmPassword && value !== confirmPassword) {
      setConfirmError("Mật khẩu không trùng khớp");
    } else {
      setConfirmError("");
    }
  };

  const handleConfirmChange = (value: string) => {
    setConfirmPassword(value);
    if (password && password !== value) {
      setConfirmError("Mật khẩu không trùng khớp");
    } else {
      setConfirmError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmError("");
    setError("")

    let hasError = false;

    if (!name.trim()) {
      setNameError("Vui lòng nhập tên của bạn");
      hasError = true;
    }

    if (!email || !validateEmail(email)) {
      setEmailError("Vui lòng nhập email hợp lệ");
      hasError = true;
    }

    if (password.length < 6) {
      setPasswordError("Mật khẩu phải từ 6 ký tự trở lên");
      hasError = true;
    }

    if (password !== confirmPassword) {
      setConfirmError("Mật khẩu xác nhận không khớp");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
      const register = await api.post("/authentication/register", {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password,
      }).then((res)=>{
        setStep("loginEmail")
      }).catch((err)=>{

        if(err.response.data.status==409){
           setEmailError("Email này đã được sử dụng");
        }
        if(err.response.data.status==400){
          setError(err.response.data.message)
        }
      }).finally(()=>{
        setLoading(false);
      })

  };

  const isSubmitDisabled =
    !name ||
    !email ||
    !password ||
    !confirmPassword ||
    !!nameError ||
    !!emailError ||
    !!passwordError ||
    !!confirmError ||
    loading;

  return (
    <Box position="relative">
      <Box textAlign="center" mb={4}>
        <Typography variant="h5" fontWeight="bold" textAlign="left">
          Tạo tài khoản của bạn cùng với email
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="left" mt={1}>
          Hãy tham gia với chúng tôi
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit} mt={3}>
        <FormControl fullWidth variant="outlined" sx={{ mb: emailError ? 1 : 3 }}>
          <InputLabel htmlFor="reg-email">Địa chỉ email</InputLabel>
          <OutlinedInput
            id="reg-email"
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="you@example.com"
            required
            error={!!emailError}
            label="Địa chỉ email"
          />
          {emailError && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
              {emailError}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth variant="outlined" sx={{ mb: nameError ? 1 : 3 }}>
          <InputLabel htmlFor="reg-name">Tên của bạn</InputLabel>
          <OutlinedInput
            id="reg-name"
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Ví dụ: Nguyễn Văn A"
            required
            error={!!nameError}
            label="Tên của bạn"
          />
          {nameError && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
              {nameError}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth variant="outlined" sx={{ mb: passwordError ? 1 : 3 }}>
          <InputLabel htmlFor="reg-password">Mật khẩu</InputLabel>
          <OutlinedInput
            id="reg-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            required
            error={!!passwordError}
            label="Mật khẩu"
            placeholder="Ít nhất 6 ký tự"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {passwordError && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
              {passwordError}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth variant="outlined" sx={{ mb: confirmError ? 1 : 4 }}>
          <InputLabel htmlFor="reg-confirm">Xác nhận mật khẩu</InputLabel>
          <OutlinedInput
            id="reg-confirm"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => handleConfirmChange(e.target.value)}
            required
            error={!!confirmError}
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {confirmError && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
              {confirmError}
            </Typography>
          )}
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={isSubmitDisabled}
          sx={{ py: 1.5, mb: 2 }}
        >
          {loading ? "Đang tạo tài khoản..." : "Đăng ký"}
        </Button>

        <Typography textAlign="center" variant="body2" color="text.secondary">
          Bạn đã có tài khoản?{" "}
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

export default RegisterEmail;