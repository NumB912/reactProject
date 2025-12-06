import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React, { useEffect, useState } from "react";
import { ModalStep } from "./AuthModal";
import api from "../../../../API/api";
import useStateLogin from "../../../store/LoginStore/login_store";

interface LoginEmailProp {
  setStep: (step: ModalStep) => void;
  email: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  password: string;
}

const LoginEmail = ({
  setStep,
  email,
  password,
  setEmail,
  setPassword,
}: LoginEmailProp) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [credentialError, setCredentialError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login } = useStateLogin();
  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  useEffect(() => {
    setPassword("");
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) setEmailError("");
    if (value && !validateEmail(value)) {
      setEmailError("vui lòng nhập đúng mãu email");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCredentialError("");
    setEmailError("");
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("vui lòng nhập đúng mãu email");
      return;
    }

    if (!password) {
      setPasswordError("Mật khẩu không được để trống");
      return;
    }

    setLoading(true);

    const LoginApi = await api
      .post("/authentication/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        login(res.data.access_token, res.data.user_id);
        setStep("success_login");
      })
      .catch((error) => {
        setError(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
        setPassword("");
      });
  };

  return (
    <Box position="relative">
      <Box textAlign="center" mb={4}>
        <Typography variant="h5" textAlign={"left"} fontWeight="bold">
          Chào mừng bạn tới website của tôi
        </Typography>
      </Box>

      {error && (
        <Typography color="error" textAlign="left" fontSize={13} mt={2}>
          {error}
        </Typography>
      )}

      <Box component="form" onSubmit={handleSubmit} mt={3}>
        <FormControl fullWidth variant="outlined" sx={{ mb: 2.5 }}>
          <InputLabel htmlFor="email">Địa chỉ email</InputLabel>
          <OutlinedInput
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="you@example.com"
            required
            autoFocus
            label="Email address"
          />

          {emailError && (
            <Typography
              color="error"
              fontStyle={"italic"}
              textAlign="left"
              fontSize={14}
              mt={1}
            >
              {emailError}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
          <InputLabel htmlFor="password">Mật khẩu</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu của bạn"
            required
            label="Password"
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          disabled={!email || !password || loading}
          fullWidth
          sx={{ px: 4, py: 1.2 }}
        >
          {loading ? "Đang xữ lý..." : "Đăng nhập"}
        </Button>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ py: 1.2 }}
        >
          <Button
            variant="text"
            onClick={() => setStep("forgotPassword")}
            sx={{ textTransform: "none" }}
          >
            Quên mật khẩu?
          </Button>

          <Button
            variant="text"
            onClick={() => setStep("register_email_only")}
            sx={{ textTransform: "none" }}
          >
            Bạn muốn đăng ký tài khoản với email?
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginEmail;
