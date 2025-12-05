import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { ModalStep } from "./AuthModal";
interface LoginOptionsProp {

  setStep: (step: ModalStep) => void;
}
const LoginOption = ({ setStep }: LoginOptionsProp) => {
  return (
    <Box textAlign="center">
      <Typography variant="h5" fontWeight="bold" textAlign={"left"} gutterBottom>
        The world awaits
      </Typography>
      <Typography variant="body2" textAlign={'left'} color="text.secondary" paragraph>
        Log in to save your trips, book your next adventure, and unlock
        exclusive deals.
      </Typography>

      {/* {error && (
        <Typography color="error" fontSize="sm" my={2}>
          {error}
        </Typography>
      )} */}

      <Box mt={4} display="flex" flexDirection="column" gap={2}>
        <Button
          fullWidth
          variant="outlined"
          size="large"
          startIcon={<i className="fa-brands fa-google" />}
          sx={{ justifyContent: "flex-start", py: 1.5 }}
        >
          Continue with Google
        </Button>

        <Button
          fullWidth
          variant="outlined"
          size="large"
          startIcon={<i className="fa-solid fa-envelope" />}
          onClick={() => setStep("loginEmail")}
          sx={{ justifyContent: "flex-start", py: 1.5 }}
        >
          Continue with Email
        </Button>
      </Box>
    </Box>
  );
};

export default LoginOption;
