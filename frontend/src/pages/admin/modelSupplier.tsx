import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Avatar,
  Typography,
  IconButton,
  CircularProgress,
  Chip,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Tabs,
  Tab,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Divider,
} from "@mui/material";
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  Block as BlockIcon,
  Warning as WarningIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Description as DescriptionIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
  Work as WorkIcon,
  Store as StoreIcon,
  Numbers as NumbersIcon,
  CreditCard as CreditCardIcon,
} from "@mui/icons-material";
import api from "../../../API/api";
import { status } from "../../enum/status_user";

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  bio: string;
  image?: {
    id: string;
    url: string;
    alt?: string;
  };
  role: {
    id: string;
    name: string;
    description?: string;
  };
  Request_become_supplier: {
    id: string;
    company_name: string;
    tax_code?: string;
    phone: string;
    status: string;
    create_at: string;
    process_at?: string;
  };
  services?: Array<{
    id: string;
    service_name: string;
    imageServices: {
      image: {
        url: string;
      };
    };
    type_service: {
      id: string;
      type: string;
    };
    create_at: string;
    update_at: string;
  }>;
  status_service: {
    select: {
      statusService: string;
    };
  };
  price_from: number;
  price_to: number;
  Document_supplier: {
    file_type: string;
    file_url: string;
    id: string;
  }[];
  location?: {
    id?: string;
    location?: string;
    lat?: number;
    lng?: number;
    ward: {
      fullName: string;
      province: {
        fullName: string;
      };
    };
  };
}

interface Role {
  id: string;
  name: string;
  description?: string;
}

interface ModalSupplierInfoProps {
  open: boolean;
  onClose: () => void;
  supplierId: string;
  modalType: "view" | "edit" | "add";
  onUpdateSuccess: () => void;
}

const ModalSupplierInfo: React.FC<ModalSupplierInfoProps> = ({
  open,
  onClose,
  supplierId,
  modalType,
  onUpdateSuccess,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isEditing, setIsEditing] = useState(
    modalType === "add" || modalType === "edit"
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open && supplierId && modalType !== "add") {
      fetchSupplierData();
    } else if (open && modalType === "add") {
      resetFormForAdd();
    }
  }, [open, supplierId, modalType]);

  const fetchSupplierData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/supplier`, {
        params: {
          id: supplierId,
        },
      });
      const supplierData = response.data.data;
      setSupplier(supplierData);
      if (modalType === "view") {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error fetching supplier data:", error);
      setErrors((prev) => ({
        ...prev,
        _general: "Không thể tải thông tin nhà cung cấp",
      }));
    } finally {
      setLoading(false);
    }
  };

  const resetFormForAdd = () => {
    setSupplier(null);
    setIsEditing(true);
    setErrors({});
  };


  const handleStatusChange = async (newStatus: string) => {
    try {
      await api.put(`/admin/update-user`, {
        status: newStatus,
        id:supplierId,
      });
      setSupplier((prev) => (prev ? { ...prev, status: newStatus } : null));
      onUpdateSuccess();
    } catch (error) {
      console.error("Error changing status:", error);
      setErrors((prev) => ({
        ...prev,
        _general: "Không thể thay đổi trạng thái",
      }));
    }
  };

//   const handleApproveSupplier = async () => {
//     try {
//       await api.put(`/admin/suppliers/${supplierId}/approve-request`);
//       fetchSupplierData();
//       onUpdateSuccess();
//     } catch (error) {
//       console.error("Error approving supplier:", error);
//       setErrors((prev) => ({
//         ...prev,
//         _general: "Không thể duyệt nhà cung cấp",
//       }));
//     }
//   };

//   const handleRejectSupplier = async (reason: string) => {
//     try {
//       await api.put(`/admin/suppliers/${supplierId}/reject-request`, {
//         rejection_reason: reason,
//       });
//       fetchSupplierData();
//       onUpdateSuccess();
//     } catch (error) {
//       console.error("Error rejecting supplier:", error);
//       setErrors((prev) => ({
//         ...prev,
//         _general: "Không thể từ chối nhà cung cấp",
//       }));
//     }
//   };

  const getStatusConfig = (ts: string) => {
    switch (ts) {
      case status.ACTIVE:
        return {
          label: "Hoạt động",
          color: "success",
          icon: <CheckCircleIcon />,
          description: "Nhà cung cấp đang hoạt động bình thường",
        };
      case status.UNACTIVE:
        return {
          label: "Không hoạt động",
          color: "default",
          icon: <PersonIcon />,
          description: "Nhà cung cấp tạm ngừng hoạt động",
        };
      case status.BANNED:
        return {
          label: "Bị cấm",
          color: "error",
          icon: <BlockIcon />,
          description: "Nhà cung cấp bị cấm hoạt động",
        };
      case status.PENDING:
        return {
          label: "Chờ duyệt",
          color: "warning",
          icon: <WarningIcon />,
          description: "Đang chờ duyệt hồ sơ",
        };
      default:
        return {
          label: "N/A",
          color: "default",
          icon: null,
          description: "",
        };
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (loading) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={300}
          >
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  if (modalType !== "add" && !supplier) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={300}
          >
            <Alert severity="error">
              Không tìm thấy thông tin nhà cung cấp
            </Alert>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }


  const requestStatus = supplier?.Request_become_supplier?.status;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, maxHeight: "90vh" },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "primary.50",
          p: 3,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={supplier?.image?.url} sx={{ width: 56, height: 56 }}>
            {supplier?.name?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {modalType === "add"
                ? "Thêm nhà cung cấp mới"
                : supplier?.Request_become_supplier?.company_name}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
              {modalType !== "add" && (
                <>
                  <Typography variant="caption" color="text.secondary">
                    ID: {supplier?.id?.slice(0, 8) || "N/A"}...
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Box>
        <Box display="flex" gap={1}>
          {modalType !== "add" && (
            <IconButton
              onClick={fetchSupplierData}
              size="small"
              title="Làm mới"
            >
              <RefreshIcon />
            </IconButton>
          )}
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: "divider" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {modalType === "add"
                ? "Thông tin nhà cung cấp mới"
                : "Chi tiết nhà cung cấp"}
            </Typography>
            {/* {modalType !== "add" &&
              !isEditing &&
              supplier?.status === status.PENDING && (
                <Box display="flex" gap={1}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleApproveSupplier}
                  >
                    Duyệt hồ sơ
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      const reason = prompt("Nhập lý do từ chối:");
                      if (reason) handleRejectSupplier(reason);
                    }}
                  >
                    Từ chối
                  </Button>
                </Box>
              )} */}
          </Box>
        </Box>

        {errors._general && (
          <Alert severity="error" sx={{ mx: 3, mt: 2 }}>
            {errors._general}
          </Alert>
        )}

        {modalType !== "add" && (
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              px: 3,
              pt: 2,
            }}
          >
            <Tab label="Thông tin cơ bản" />
            <Tab label="Thông tin công ty" />
            <Tab label="Dịch vụ" />
            <Tab label="Quản lý tài khoản" />
          </Tabs>
        )}

        {activeTab === 0 && modalType !== "add" && supplier && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 ,p:3}}>

              <TextField
                fullWidth
                label="Email"
                type="email"
                disabled
                value={supplier?.email}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                fullWidth
                label="Họ và tên"
                value={supplier.name}
                disabled
                error={!!errors.name}
                helperText={errors.name}
              />

              <TextField
                fullWidth
                label="Số điện thoại"
                value={supplier.phone}
                disabled
                error={errors.phone ? true : false}
              />


              <TextField
                fullWidth
                label="Giới thiệu"
                value={supplier.bio}
                disabled
                multiline
                rows={4}
              />
          </Box>
        )}

        {activeTab === 1 && modalType !== "add" && supplier && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 ,p:3}}>

              <TextField
                fullWidth
                label="Mã thuế"
                type="email"
                disabled
                value={supplier?.Request_become_supplier.tax_code}
              />
              <TextField
                fullWidth
                label="Công ty"
                value={`${supplier.location?.location},${supplier.location?.ward.fullName},${supplier.location?.ward.province.fullName}`}
                disabled
                error={!!errors.name}
                helperText={errors.name}
              />

              <TextField
                fullWidth
                label="Số điện thoại"
                value={supplier.phone}
                disabled
                error={errors.phone ? true : false}
              />


              <TextField
                fullWidth
                label="Giới thiệu"
                value={supplier.bio}
                disabled

                multiline
                rows={4}
              />
          </Box>
        )}

        {activeTab === 2 && modalType !== "add" && supplier && (
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="h6">
                    Danh sách dịch vụ ({supplier.services?.length || 0})
                  </Typography>
                </Box>
              </Grid>

              {supplier.services && supplier.services.length > 0 ? (
                <Grid item xs={12}>
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Tên dịch vụ</TableCell>
                          <TableCell>Loại</TableCell>
                          <TableCell>Giá</TableCell>
                          <TableCell>Trạng thái</TableCell>
                          <TableCell>Ngày tạo</TableCell>
                          <TableCell>Thao tác</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {supplier.services.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell>
                              <Typography fontWeight="medium">
                                {service.service_name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={service.type_service.type}
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography fontWeight="medium">
                                {formatCurrency(service.price)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={service.status}
                                size="small"
                                color={
                                  service.status === "active"
                                    ? "success"
                                    : "default"
                                }
                              />
                            </TableCell>
                            <TableCell>
                              {formatDate(service.create_at)}
                            </TableCell>
                            <TableCell>
                              <IconButton size="small">
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <Box textAlign="center" py={4}>
                    <Typography color="text.secondary">
                      Chưa có dịch vụ nào
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        )}

        {activeTab === 3 && modalType !== "add" && supplier && (
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {/* Account Status */}
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Quản lý trạng thái tài khoản
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {getStatusConfig(supplier.status).description }
                    </Typography>

                    <Grid container spacing={2}>
                      {[
                        status.ACTIVE,
                        status.UNACTIVE,
                        status.BANNED,
                        status.PENDING,
                      ].map((statusValue) => {
                        const config = getStatusConfig(statusValue);
                        const isCurrent = supplier.status === statusValue;

                        return (
                          <Grid item xs={6} md={3} key={statusValue}>
                            <Card
                              variant="outlined"
                              sx={{
                                borderColor: isCurrent
                                  ? "primary.main"
                                  : "divider",
                                bgcolor: isCurrent
                                  ? "primary.50"
                                  : "background.paper",
                                cursor: "pointer",
                                "&:hover": { bgcolor: "action.hover" },
                              }}
                              onClick={() =>
                                !isCurrent && handleStatusChange(statusValue)
                              }
                            >
                              <CardContent sx={{ textAlign: "center" }}>
                                <Box
                                  sx={{
                                    color: isCurrent
                                      ? "primary.main"
                                      : "text.secondary",
                                    mb: 1,
                                  }}
                                >
                                  {config.icon}
                                </Box>
                                <Typography variant="body2" fontWeight="medium">
                                  {config.label}
                                </Typography>
                                {isCurrent && (
                                  <Typography variant="caption" color="primary">
                                    Hiện tại
                                  </Typography>
                                )}
                              </CardContent>
                            </Card>
                          </Grid>
                        );
                      })}
                    </Grid>

                    <Alert severity="info" sx={{ mt: 2 }}>
                      Nhấn vào trạng thái để thay đổi. Khi tài khoản bị cấm, tất
                      cả dịch vụ sẽ bị vô hiệu hóa.
                    </Alert>
                  </CardContent>
                </Card>
              </Grid>

            </Grid>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalSupplierInfo;
