import React, { useEffect, useState } from "react";
import api from "../../../../API/api";
import { Box, Typography, Paper, Grid, Alert, Chip, Button } from "@mui/material";
import { status } from "../../../enum/status_user";
import { statusBecomeSupplier } from "../../../enum/status_become.enum";
import { HourglassEmpty } from "@mui/icons-material";
import { useNavigate } from "react-router";

interface Request {
  company_name: string;
  create_at: string;

  id: string;

  location_id: string;

  name: string;

  proccess_at: string;

  status: string;

  tax_code: string;

  user_id: string;
}

const Document_become_supplier = () => {
  const navigate = useNavigate()
  const [request, setRequest] = useState<Request>({});
  useEffect(() => {
    api.get("user/get_request").then((res) => {
        console.log(res)
      setRequest(res.data.data);
    });
  }, []);

//   const request = {
//     company_name: "A",
//     name: "service",
//     tax_code: "0182394773",
//     status: "PENDING",
//     create_at: "2025-12-09T01:06:13.302Z",
//   };

  const getStatusInfo = (status: statusBecomeSupplier) => {
    switch (status) {
      case "PENDING":
        return { color: "warning", label: "Đang chờ" };
      case "APPROVED":
        return { color: "success", label: "Đã duyệt" };
      case "CANCEL":
        return { color: "error", label: "Đã từ chối" };
      default:
        return { color: "default", label: status };
    }
  };


  if (!request) {
    return (
      <Box sx={{ p: 4 }}>
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            borderRadius: 3,
          }}
        >
          <HourglassEmpty sx={{ fontSize: 70, color: "grey.500", mb: 3 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom color="text.primary">
            Bạn chưa gửi yêu cầu trở thành nhà cung cấp
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Khi bạn gửi yêu cầu, thông tin và trạng thái xét duyệt sẽ được hiển thị tại đây.
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="/become-supplier"
            sx={{ mt: 2, borderRadius: 3 }}
          >
            Gửi yêu cầu ngay
          </Button>
        </Paper>
      </Box>
    );
}


  const statusInfo = getStatusInfo(request.status as statusBecomeSupplier);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Thông tin yêu cầu
      </Typography>

      <Alert severity={statusInfo.color} sx={{ mb: 2 }}>
        Trạng thái: {statusInfo.label}
      </Alert>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Tên công ty
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {request.company_name}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Dịch vụ/ngành nghề
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {request.name}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Mã số thuế
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {request.tax_code}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Ngày tạo
            </Typography>
            <Typography variant="body1">
              {new Date(request.create_at).toLocaleDateString("vi-VN")}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Mã yêu cầu:
              </Typography>
              <Chip
                label={request.id ? request.id.substring(0, 12) + "..." : "N/A"}
                size="small"
                variant="outlined"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Document_become_supplier;
