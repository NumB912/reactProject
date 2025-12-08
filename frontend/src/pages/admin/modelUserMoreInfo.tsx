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
} from "@mui/material";
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CheckCircle as CheckCircleIcon,
  Block as BlockIcon,
  Warning as WarningIcon,
  CalendarToday as CalendarIcon,
  Description as DescriptionIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { User } from "../../model/user";
import { status } from "../../enum/status_user";
import api from "../../../API/api";

interface Role {
  id: string;
  name: string;
  description?: string;
}

interface ModalUserMoreInfoProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  onUpdateSuccess: () => void;
}

const ModalUserMoreInfo: React.FC<ModalUserMoreInfoProps> = ({
  open,
  onClose,
  userId,
  onUpdateSuccess,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<User | null>();
  const [roles, setRoles] = useState<Role[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    role_id: "",
    status: status.ACTIVE,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open && userId) {
      fetchUserData();
      fetchRoles();
    }
  }, [open, userId]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        role_id: user.role_id || user.role?.id || "",
        status: user.status || status.ACTIVE,
      });
    }
  }, [user]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) {
      newErrors.name = "Vui lòng nhập họ và tên";
    }
    if (!formData.email?.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (
      formData.phone &&
      !/^0[3|5|7|8|9]\d{8}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Số điện thoại không hợp lệ (VD: 0901234567)";
    }



    if (!formData.role_id) {
      newErrors.role_id = "Vui lòng chọn vai trò";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {

      await api.put(`/admin/update-user`, {
        status_user: formData.status,
        id: userId,
        name: formData.name,
        phone: formData.phone,
        bio: formData.bio,
      }).then((res)=>console.log(res)).catch((res)=>console.log(res))
      onUpdateSuccess();
      setIsEditing(false);
      fetchUserData();
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setSaving(false);
    }
  };

  const fetchUserData = () => {
    api
      .get("/admin/detail-user", {
        params: {
          id: userId,
        },
      })
      .then((res) => {
        setUser(res.data.data.user);
      })
      .catch((err) => console.log(err));
  };

  const fetchRoles = () => {
    api
      .get("/role")
      .then((res) => setRoles(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleStatusChange = async (newStatus: status) => {
    try {
      setUser((prev) => (prev ? { ...prev, status: newStatus } : null));
      setFormData((prev) => ({ ...prev, status: newStatus }));
      onUpdateSuccess();
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  const getStatusConfig = (st?: status) => {
    switch (st) {
      case status.ACTIVE:
        return {
          label: "Hoạt động",
          color: "success",
          icon: <CheckCircleIcon />,
        };
      case status.UNACTIVE:
        return {
          label: "Không hoạt động",
          color: "default",
          icon: <PersonIcon />,
        };
      case status.BANNED:
        return { label: "Bị cấm", color: "error", icon: <BlockIcon /> };
      default:
        return { label: "N/A", color: "default", icon: null };
    }
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

  if (!user) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={300}
          >
            <Typography>Không có dữ liệu</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  const statusConfig = getStatusConfig(user?.status);

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
      {/* Header with user info */}
      <DialogTitle
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 3,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ width: 56, height: 56 }}>
            {user?.name?.charAt(0) || user?.email?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {user?.name || "Chưa đặt tên"}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={0.5}>
              <Chip
                label={statusConfig.label}
                color={statusConfig.color as any}
                size="small"
              />
              <Typography variant="caption" color="text.secondary">
                ID: {user?.id?.slice(0, 8) || "N/A"}...
              </Typography>
            </Box>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: "divider" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" fontWeight="bold">
              Chi tiết người dùng
            </Typography>
            <Box display="flex" gap={1}>
              {!isEditing ? (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setIsEditing(true)}
                >
                  Chỉnh sửa
                </Button>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => setIsEditing(false)}
                  >
                    Hủy
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={
                      saving ? <CircularProgress size={20} /> : <SaveIcon />
                    }
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? "Đang lưu..." : "Lưu thay đổi"}
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Box>

        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          sx={{ borderBottom: 1, borderColor: "divider", px: 3, pt: 2 }}
        >
          <Tab label="Thông tin cơ bản" />
          <Tab label="Quản lý tài khoản" />
        </Tabs>

        {activeTab === 0 && (
          <Box sx={{ p: 3 }}>
            {isEditing ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                
                <Card variant="outlined">
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    disabled
                    value={formData?.email}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Card>

                <Card variant="outlined">
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Card>

                <Card variant="outlined">
                  <TextField
                    fullWidth
                    label="Số điện thoại"
                    value={formData.phone}
                    error={errors.phone?true:false}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </Card>

                <Card variant="outlined">
                  <FormControl fullWidth>
                    <InputLabel>Vai trò</InputLabel>
                    <Select
                      value={formData.role_id}
                      label="Vai trò"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          role_id: e.target.value as string,
                        }))
                      }
                    >
                      {roles.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                          {role.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Card>

                <Card variant="outlined">
                  <TextField
                    fullWidth
                    label="Giới thiệu"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    multiline
                    rows={4}
                  />
                </Card>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Email
                    </Typography>
                    <Typography variant="body1">{user.email}</Typography>
                  </CardContent>
                </Card>

                         <Card variant="outlined">
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Email
                    </Typography>
                    <Typography variant="body1">{user.name}</Typography>
                  </CardContent>
                </Card>


                <Card variant="outlined">
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Số điện thoại
                    </Typography>
                    <Typography variant="body1">
                      {user?.phone || "Chưa cập nhật"}
                    </Typography>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Vai trò
                    </Typography>
                    <Typography variant="body1">
                      {user.role?.id || "Không xác định"}
                    </Typography>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Giới thiệu
                    </Typography>
                    <Typography variant="body1">
                      {user?.bio || "Chưa có giới thiệu"}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            )}
          </Box>
        )}

        {activeTab === 1 && (
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Quản lý trạng thái tài khoản
                    </Typography>
                    <Grid container spacing={2}>
                      {[status.ACTIVE, status.BANNED, status.UNACTIVE].map(
                        (status) => {
                          const config = getStatusConfig(status);
                          const isCurrent = user?.status === status;

                          return (
                            <Grid item xs={6} md={3} key={status}>
                              <Card
                                variant="outlined"
                                sx={{
                                  borderColor: isCurrent
                                    ? "primary.main"
                                    : "divider",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  !isCurrent && handleStatusChange(status)
                                }
                              >
                                <CardContent sx={{ textAlign: "center" }}>
                                  <Box sx={{ mb: 1 }}>{config.icon}</Box>
                                  <Typography
                                    variant="body2"
                                    fontWeight="medium"
                                  >
                                    {config.label}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </Grid>
                          );
                        }
                      )}
                    </Grid>
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

export default ModalUserMoreInfo;
