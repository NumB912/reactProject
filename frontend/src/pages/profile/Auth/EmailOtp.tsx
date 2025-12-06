// components/auth/EmailOtpAuth.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Link,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { ArrowBack, MarkEmailReadOutlined } from '@mui/icons-material';
import { ModalStep } from './AuthModal';
import api from '../../../../API/api';

interface EmailOtpAuthProps {
 setStep: (type: ModalStep) => void;
 setEmail: (email:string)=>void;
 email:string;
}

const EmailOtpAuth: React.FC<EmailOtpAuthProps> = ({
  setStep,
  setEmail,
  email
}) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown === 0) return;
    const timer = setInterval(() => setCountdown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (text) {
      const digits = text.split('');
      setOtp([...digits, ...Array(6).fill('').slice(digits.length)]);
      setTimeout(() => inputsRef.current[5]?.focus(), 0);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (code?: string) => {
    const fullCode = code || otp.join('');
    if (fullCode.length !== 6) return;

    setIsLoading(true);
    setError('');

    const verifyOtp = await api.post("/authentication/submit-otp",{
      otp:fullCode,
      email:email
    }).then((res)=>{
      setStep("register")
    }).catch((error)=>{
      setError(error.response.data.message)
    }).finally(()=>{
      setIsLoading(false)
    })

  };

  const handleResend = async () => {
    setIsLoading(true);
    setError('');
    setCountdown(60);
    setOtp(['', '', '', '', '', '']);

    try {
      setSuccess(false);
      inputsRef.current[0]?.focus();
    } catch (err) {
      setError('Gửi lại mã thất bại. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box maxWidth={420} mx="auto" p={3}>
      <Box textAlign="center" mb={4}>
        <MarkEmailReadOutlined sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Xác minh email
        </Typography>
        <Typography color="text.secondary">
          Chúng tôi đã gửi mã xác thực 6 chữ số đến
        </Typography>
        <Typography fontWeight={600} mt={1}>
          {email}
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 3 }}>Xác thực thành công!</Alert>}

      <Stack direction="row" spacing={1.5} justifyContent="center" mb={4}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <TextField
            key={i}
            inputRef={(el) => (inputsRef.current[i] = el)}
            value={otp[i]}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            disabled={isLoading || success}
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center', fontSize: '2rem', fontWeight: 600 },
            }}
            sx={{
              width: 60,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: success ? 'success.light' : undefined,
              },
            }}
            autoFocus={i === 0}
          />
        ))}
      </Stack>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={() => handleVerify()}
        disabled={isLoading || otp.some(d => !d) || success}
        sx={{ py: 1.8, borderRadius: 2, textTransform: 'none', fontSize: '1.1rem' }}
      >
        {isLoading ? <CircularProgress size={28} color="inherit" /> : 'Xác nhận'}
      </Button>
      <Box textAlign="center" mt={4}>
        <Typography variant="body2" color="text.secondary">
          {countdown > 0 ? (
            <>Gửi lại mã sau {countdown} giây</>
          ) : (
            <>
              Chưa nhận được mã?{' '}
              <Link
                component="button"
                onClick={handleResend}
                underline="none"
                fontWeight={600}
                color="primary"
              >
                Gửi lại
              </Link>
            </>
          )}
        </Typography>
      </Box>
      <Typography variant="caption" color="text.secondary" display="block" textAlign="center" mt={3}>
        Vui lòng kiểm tra cả thư mục Spam/Junk nếu không thấy email
      </Typography>
    </Box>
  );
};

export default EmailOtpAuth;