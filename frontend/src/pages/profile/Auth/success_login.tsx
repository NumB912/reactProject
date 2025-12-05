import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
interface successLoginProp{
  onClose:()=>void
}
const Success_login = ({onClose}:successLoginProp) => {
  return (
    <Box textAlign="center" height={"150px"} maxHeight={"300px"}>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign={"left"}
        gutterBottom
      >
        Chào mừng bạn đến với chúng tôi
      </Typography>
      <Typography variant="body2" textAlign={"left"} color="text.secondary" >
        Đăng nhập thành công rồi hãy trải nghiệm thêm tính năng mới nha
      </Typography>

      <Box
        mt={4}
        display="flex"
        flexDirection="column"
        position={"relative"}
        gap={2}
        width={"100%"}
      >
        <IconButton
          onClick={onClose}
          aria-label="continue"
          sx={{
            position: "absolute",
            zIndex: 10,
            top:20,
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 64,
            height: 64,
            bgcolor: "black",
            color: "white",
            "&:hover": {
              bgcolor: "grey.800",
            },

          }}
        >
          <i className="fa-solid fa-arrow-right" style={{ fontSize: 26 }} />
        </IconButton>
      </Box>
      
    </Box>
  );
};

export default Success_login;
