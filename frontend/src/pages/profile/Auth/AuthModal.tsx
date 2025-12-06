import { useState, useCallback } from "react";
import React from "react";
import { Modal, Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import InputShow from "../../../component/UI/Input/InputShow";
import LoginOption from "./LoginOption";
import LoginEmail from "./LoginEmail";
import { ForgotPassword } from "./ForgotPassword";
import RegisterEmail from "./RegisterEmail";
import EmailOtpAuth from "./EmailOtp";
import RegisterEmailOnly from "./register_email_only";
import Success_login from "./success_login";
import Success_register from "./success_register";
export type ModalStep =
  | "loginOptions"
  | "loginEmail"
  | "forgotPassword"
  | "otp"
  | "register"
  | "register_email_only"
  | "Otp_Email"
  | "success_register"
  | "success_login";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  logo: string;
  initialError?: string;
}

export default function LoginModal({
  open,
  onClose,
  logo,
  initialError,
}: LoginModalProps) {
  const [step, setStep] = useState<ModalStep>("loginOptions");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = useCallback(() => {
    onClose();
    setTimeout(() => {
      setStep("loginOptions");
    }, 300);
  }, [onClose]);

  const goBack = () => setStep("loginOptions");

  const modalStyle = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "100%", sm: 500 },
    maxHeight: "90vh",
    overflowY: "auto" as const,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
    outline: "none",
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Box sx={modalStyle}>
        {step !== "loginOptions" && (
          <IconButton
            onClick={goBack}
            sx={{ position: "absolute", top: 16, left: 16, zIndex: 1 }}
            aria-label="back"
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        )}

        <Box textAlign="center" mb={3}>
          <img src={logo} alt="Logo" style={{ height: 60 }} />
        </Box>

        {initialError && (
          <Box textAlign="center" color="error.main" mb={2} fontSize={14}>
            {initialError}
          </Box>
        )}
        {step === "loginOptions" && <LoginOption setStep={setStep} />}

        {step === "loginEmail" && (
          <LoginEmail
            email={email}
            setEmail={setEmail}
            password={password}
            setStep={setStep}
            setPassword={setPassword}
          />
        )}

        {step === "forgotPassword" && <ForgotPassword setStep={setStep} />}

        {step === "register" && (
          <RegisterEmail
            email={email}
            setEmail={setEmail}
            password={password}
            setStep={setStep}
            setPassword={setPassword}
          />
        )}

        {step === "register_email_only" && (
          <RegisterEmailOnly
            setStep={setStep}
            email={email}
            setEmail={setEmail}
          />
        )}

        {step === "Otp_Email" && (
          <EmailOtpAuth setStep={setStep} setEmail={setEmail} email={email} />
        )}

        {step === "success_login" && <Success_login onClose={()=>{
          onClose(),
          setStep("loginOptions")
        }} />}

        {step === "success_register" && <Success_register />}
      </Box>
    </Modal>
  );
}
