import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Button,
  Alert,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  MenuItem,
  Snackbar,
  Switch,
  FormControlLabel,
  Grid,
  Autocomplete,
  Checkbox,
  Select,
} from "@mui/material";
import {
  Close as CloseIcon,
  AttachMoney as AttachMoneyIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Image as ImageIcon,
  Star as StarIcon,
  Check as CheckIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Edit as EditIcon,
  Hotel as HotelIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import viLocale from "date-fns/locale/vi";
import api from "../../../API/api";
import { status } from "../../enum/status_user";
import { formatUrlImg } from "../../utils/urlFormat";
import { statusService } from "../../enum/status_service.enum";
import { statusBecomeSupplier } from "../../enum/status_become.enum";
import { amenity } from "../../model/amenity";
import { Province, Ward } from "../../store";

interface ServiceDetailModalProps {
  serviceId: string;
  isOpen: boolean;
  onClose: () => void;
  onServiceUpdated?: () => void;
}

interface ServiceDetail {
  id: string;
  service_name: string;
  createdAt: string;
  updatedAt: string;
  imageServices: {
    image: {
      url: string;
      id: string;
    };
  }[];
  amenities_hotels: {
    amenity: {
      amenity: string;
      id: string;
    };
  }[];
  status_id: string;
  status_service: {
    statusService: string;
    id: string;
  };
  price_from: number;
  price_to: number;
  location: {
    location: string;
    ward: {
      fullName: string;
      code: string;
      province: {
        fullName: string;
        code: string;
      };
    };
  };
  description?: string;
  supplier: {
    name: string;
    Request_become_supplier: {
      company_name: string;
    };
    email: string;
    phone: string;
  };
  rating?: number;
  review?: number;
  total_bookings?: number;
}

interface Amenity {
  id: string;
  amenity: string;
}

interface EditServiceData {
  service_name: string;
  description: string;
  price_from: number;
  price_to: number;
  location: {
    location: string;
    ward_id?: string;
    province_id?: string;
  };
  status_id: string;
  amenities: Amenity[];
  images: File[];
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  serviceId,
  isOpen,
  onClose,
  onServiceUpdated,
}) => {
  const [serviceDetail, setServiceDetail] = useState<ServiceDetail | null>(
    null
  );
  const [location,setLocation] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editData, setEditData] = useState<EditServiceData | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [imageChange, setImageChange] =
    useState<{ id: string; url: string }[]>();
  const [imageAvailiable, setImageVailiable] =
    useState<{ id: string; url: string }[]>();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [availableAmenities, setAvailableAmenities] = useState<Amenity[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([]);
  const [selectProvince, setSelectProvince] = useState("");
  const [selectWard, setSelectWard] = useState("");
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  useEffect(() => {
    if (isOpen && serviceId) {
      fetchAvailableAmenities();
      fetchServiceDetail();
    }
  }, [isOpen, serviceId]);

  useEffect(() => {
    Promise.all([api.get("/location/province", { params: { q: "" } })])
      .then(([provRes]) => {
        setProvinces(provRes.data.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectProvince) {
      setWards([]);
      setSelectWard("");
      return;
    }
    api
      .get("/location/ward", {
        params: {
          province_code: selectProvince,
        },
      })
      .then((res) => {
        setWards(res.data.data || res.data);
      })
      .catch((err) => {
        console.error("Lỗi load phường/xã:", err);
        setWards([]);
      });
  }, [selectProvince]);

  const fetchServiceDetail = async () => {
    setLoading(true);
    setError(null);
    setIsEditing(false);
    setEditData(null);

    try {
      const response = await api.get(`/supplier/service_detail`, {
        params: {
          service_id: serviceId,
        },
      });

      if (response.data.status === 200) {
        const data = response.data.data;
        setServiceDetail(data);
        setEditData({
          service_name: data.service_name,
          description: data.description || "",
          price_from: data.price_from,
          price_to: data.price_to,
          location: {
            location: data.location?.location || "",
            ward_id: data.location?.ward?.code,
          },
          status_id: data.status_id,
          amenities: data.amenities_hotels || [],
          images: [],
        });
        setLocation(data.location.location)
        setSelectWard(data.location.ward.code)
        setSelectProvince(data.location.ward.province.code)
        const selected = data.amenities_hotels?.map((item) => item.amenity) || [];
        setImageVailiable(data.imageServices.map((item) => item.image));
        setAvailableAmenities(selected);
      } else {
        setError(response.data.message || "Không thể tải chi tiết dịch vụ");
      }
    } catch (err) {
      console.error("Error fetching service detail:", err);
      setError("Đã xảy ra lỗi khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableAmenities = async () => {
    try {
      const response = await api.get("/amenity-service");
      setAmenities(response.data.data);
    } catch (err) {
      console.error("Error fetching amenities:", err);
      setAmenities([
        { id: "1", amenity: "Wi-Fi miễn phí" },
        { id: "2", amenity: "Bể bơi" },
        { id: "3", amenity: "Phòng gym" },
        { id: "4", amenity: "Bữa sáng" },
        { id: "5", amenity: "Đỗ xe miễn phí" },
        { id: "6", amenity: "Spa" },
        { id: "7", amenity: "Nhà hàng" },
        { id: "8", amenity: "Quầy bar" },
        { id: "9", amenity: "Phòng họp" },
        { id: "10", amenity: "Dịch vụ dọn phòng" },
      ]);
    }
  };

  const handleEditToggle = () => {
    setSelectedAmenities(availableAmenities);
    setImageChange(imageAvailiable);
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    if (!editData || !serviceDetail) return;

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("image_change", JSON.stringify(imageChange));
      formData.append(
        "amenities",
        JSON.stringify(selectedAmenities.map((amenity) => amenity.id))
      );

      console.log(selectedAmenities)
      formData.append("location", JSON.stringify({
        ln:location,
        ward_id:selectWard,
        province_id:selectProvince
      }));
      formData.append(
        "service",
        JSON.stringify({
          service_name: editData.service_name,
          price_from: editData.price_from,
          price_to: editData.price_to,
          status_id: editData.status_id,
        })
      );
      editData.images.forEach((file, index) => {
        formData.append("imageFiles", file);
      });

      const response = await api.put(
        `/supplier/services?service_id=${serviceId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === 200) {
        setSnackbar({
          open: true,
          message: "Cập nhật dịch vụ thành công",
          severity: "success",
        });
        setIsEditing(false);

        fetchServiceDetail();

        if (onServiceUpdated) {
          onServiceUpdated();
        }
      } else {
        setSnackbar({
          open: true,
          message: response.data.message || "Cập nhật thất bại",
          severity: "error",
        });
      }
    } catch (err: any) {
      console.error("Error updating service:", err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Đã xảy ra lỗi khi cập nhật",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (serviceDetail) {
      const currentAmenityIds =
        serviceDetail.amenities_hotels?.map((item) => item.amenity.id) || [];
      const selected = amenities.filter((amenity) =>
        currentAmenityIds.includes(amenity.id)
      );
      setImageChange(imageAvailiable);
      setSelectedAmenities(selected);
      setLocation(serviceDetail.location.location)
      setEditData({
        service_name: serviceDetail.service_name,
        description: serviceDetail.description || "",
        price_from: serviceDetail.price_from,
        price_to: serviceDetail.price_to,
        location: {
          location: serviceDetail.location?.location || "",
          ward_id: serviceDetail.location?.ward?.code,
        },
        status_id: serviceDetail.status_id,
        amenities: [],
        images: [],
      });
    }
  };

  const handleInputChange = (field: keyof EditServiceData, value: any) => {

    if (editData) {
      setEditData({
        ...editData,
        [field]: value,
      });
    }
  };

  const handleNestedInputChange = (
    parent: keyof EditServiceData,
    field: string,
    value: any
  ) => {

    if (editData && editData[parent]) {
      setEditData({
        ...editData,
        [parent]: {
          ...(editData[parent] as any),
          [field]: value,
        },
      });
    }
  };
  

  const handleAmenitiesChange = (event: any, newValue: Amenity[]) => {
    console.log(newValue);
    setSelectedAmenities(newValue);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && editData) {
      const files = Array.from(event.target.files);
      setEditData({
        ...editData,
        images: [...editData.images, ...files],
      });
    }
  };

  const handleImageDelete = (imageId: string) => {
    if (imageChange) {
      console.log(imageChange);
      setImageChange((prev) => prev?.filter((image) => image.id != imageId));
    }
  };

  const handleRemoveNewImage = (index: number) => {
    if (editData) {
      const newImages = [...editData.images];
      newImages.splice(index, 1);
      setEditData({
        ...editData,
        images: newImages,
      });
    }
  };

  const handleDeleteService = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      setSaving(true);
      try {
        const response = await api.delete(`/supplier/services/${serviceId}`);

        if (response.data.status === 200) {
          setSnackbar({
            open: true,
            message: "Xóa dịch vụ thành công",
            severity: "success",
          });
          onClose();
          if (onServiceUpdated) {
            onServiceUpdated();
          }
        } else {
          setSnackbar({
            open: true,
            message: response.data.message || "Xóa thất bại",
            severity: "error",
          });
        }
      } catch (err) {
        console.error("Error deleting service:", err);
        setSnackbar({
          open: true,
          message: "Đã xảy ra lỗi khi xóa",
          severity: "error",
        });
      } finally {
        setSaving(false);
      }
    }
  };

  const formatPrice = (price: number): string => {
    if (!price) return "0 VNĐ";
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
  };

  const formatDate = (dateString: string): string => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm", {
        locale: viLocale,
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (
    statusId: string
  ): "success" | "error" | "warning" | "info" => {
    switch (statusId) {
      case statusService.ACTIVE:
        return "success";
      case statusService.BAN:
        return "error";
      case statusService.PENDING:
        return "warning";
      case statusService.INACTIVE:
        return "info";
      default:
        return "info";
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case statusService.ACTIVE:
        return "Hoạt động";
      case statusService.BAN:
        return "Bị cấm";
      case statusService.PENDING:
        return "Đang chờ duyệt";
      case statusService.INACTIVE:
        return "Ngừng cung cấp";
      default:
        return "Không xác định";
    }
  };

  const handleRetry = () => {
    setError(null);
    fetchServiceDetail();
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const statusOptions = [
    { value: statusService.ACTIVE, id: "ACTIVE", label: "Hoạt động" },
    { value: statusService.INACTIVE, id: "INACTIVE", label: "Ngừng cung cấp" },
  ];

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        scroll="paper"
        PaperProps={{
          sx: {
            borderRadius: 2,
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "primary.light",
            color: "primary.contrastText",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <HotelIcon />
            <Typography variant="h6" component="div">
              {isEditing
                ? "Chỉnh sửa dịch vụ"
                : serviceDetail?.service_name || "Chi tiết dịch vụ"}
            </Typography>
            {serviceDetail && !isEditing && (
              <Chip
                label={getStatusText(
                  serviceDetail.status_service.statusService
                )}
                color={getStatusColor(
                  serviceDetail.status_service.statusService
                )}
                size="small"
                sx={{ color: "white" }}
              />
            )}
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>


        <DialogContent dividers sx={{ p: 3 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert
              severity="error"
              action={
                <Button color="inherit" size="small" onClick={handleRetry}>
                  Thử lại
                </Button>
              }
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          ) : serviceDetail && editData ? (
            <Box>
              {isEditing && (
                <Alert severity="info" sx={{ mb: 3 }}>
                  Bạn đang ở chế độ chỉnh sửa. Hãy thay đổi thông tin và nhấn
                  "Lưu thay đổi" khi hoàn tất.
                </Alert>
              )}

              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <HotelIcon /> Thông tin cơ bản
                </Typography>

                {isEditing ? (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <TextField
                      label="Tên dịch vụ"
                      value={editData.service_name}
                      onChange={(e) =>
                        handleInputChange("service_name", e.target.value)
                      }
                      fullWidth
                      required
                    />
                    <TextField
                      label="Mô tả dịch vụ"
                      value={editData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      multiline
                      rows={4}
                      fullWidth
                    />
                    <TextField
                      select
                      label="Trạng thái"
                      value={editData.status_id}
                      onChange={(e) =>
                        handleInputChange("status_id", e.target.value)
                      }
                      fullWidth
                    >
                      {statusOptions.map((option) => (
                        <MenuItem onClick={(e)=>{console.log(e.target.value)}} key={option.id} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                ) : (
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Tên dịch vụ
                      </Typography>
                      <Typography variant="h6">
                        {serviceDetail.service_name}
                      </Typography>
                    </Box>
                    {serviceDetail.description && (
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Mô tả
                        </Typography>
                        <Typography>{serviceDetail.description}</Typography>
                      </Box>
                    )}
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Trạng thái
                      </Typography>
                      <Typography>
                        {getStatusText(
                          serviceDetail.status_service.statusService
                        )}
                      </Typography>
                    </Box>
                  </Stack>
                )}
              </Paper>

              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <ImageIcon /> Hình ảnh dịch vụ
                </Typography>

                {isEditing ? (
                  <>
                    {serviceDetail.imageServices.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          Hình ảnh hiện tại
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                          {imageChange.map((image, index) => (
                            <Card
                              key={image.id}
                              sx={{ position: "relative", width: 150 }}
                            >
                              <IconButton
                                size="small"
                                sx={{
                                  position: "absolute",
                                  top: 4,
                                  right: 4,
                                  bgcolor: "rgba(0,0,0,0.5)",
                                  color: "white",
                                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                                }}
                                onClick={() => handleImageDelete(image.id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                              <CardMedia
                                component="img"
                                height="120"
                                image={formatUrlImg(image.url)}
                                alt={`Hình ảnh ${index + 1}`}
                                sx={{ objectFit: "cover" }}
                              />
                            </Card>
                          ))}
                        </Box>
                      </Box>
                    )}

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Hình ảnh mới
                      </Typography>
                      {editData.images.length > 0 && (
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                            mb: 2,
                          }}
                        >
                          {editData.images.map((file, index) => (
                            <Card
                              key={index}
                              sx={{ position: "relative", width: 150 }}
                            >
                              <IconButton
                                size="small"
                                sx={{
                                  position: "absolute",
                                  top: 4,
                                  right: 4,
                                  bgcolor: "rgba(0,0,0,0.5)",
                                  color: "white",
                                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                                }}
                                onClick={() => handleRemoveNewImage(index)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                              <CardMedia
                                component="img"
                                height="120"
                                image={URL.createObjectURL(file)}
                                alt={`Hình ảnh mới ${index + 1}`}
                                sx={{ objectFit: "cover" }}
                              />
                            </Card>
                          ))}
                        </Box>
                      )}
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<AddIcon />}
                      >
                        Thêm hình ảnh
                        <input
                          type="file"
                          hidden
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </Button>
                    </Box>
                  </>
                ) : serviceDetail.imageServices &&
                  serviceDetail.imageServices.length > 0 ? (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {serviceDetail.imageServices.map((image, index) => (
                      <Card key={image.image.id} sx={{ width: 150 }}>
                        <CardMedia
                          component="img"
                          height="120"
                          image={formatUrlImg(image.image.url)}
                          alt={`Hình ảnh ${index + 1}`}
                          sx={{ objectFit: "cover" }}
                        />
                      </Card>
                    ))}
                  </Box>
                ) : (
                  <Typography color="text.secondary">
                    Chưa có hình ảnh
                  </Typography>
                )}
              </Paper>

              <Paper sx={{ p: 3, mb: 3, bgcolor: "primary.lighter" }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <AttachMoneyIcon /> Thông tin giá
                </Typography>

                {isEditing ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                    }}
                  >
                    <TextField
                      label="Giá thấp nhất"
                      type="number"
                      value={editData.price_from}
                      onChange={(e) =>
                        handleInputChange(
                          "price_from",
                          parseFloat(e.target.value)
                        )
                      }
                      fullWidth
                      InputProps={{
                        endAdornment: "VNĐ",
                      }}
                    />
                    <TextField
                      label="Giá cao nhất"
                      type="number"
                      value={editData.price_to}
                      onChange={(e) =>
                        handleInputChange(
                          "price_to",
                          parseFloat(e.target.value)
                        )
                      }
                      fullWidth
                      InputProps={{
                        endAdornment: "VNĐ",
                      }}
                    />
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                    }}
                  >
                    <Card sx={{ flex: 1 }}>
                      <CardContent>
                        <Typography color="text.secondary" variant="body2">
                          Giá thấp nhất
                        </Typography>
                        <Typography variant="h5" color="primary.main">
                          {formatPrice(serviceDetail.price_from)}
                        </Typography>
                      </CardContent>
                    </Card>
                    <Card sx={{ flex: 1 }}>
                      <CardContent>
                        <Typography color="text.secondary" variant="body2">
                          Giá cao nhất
                        </Typography>
                        <Typography variant="h5" color="primary.main">
                          {formatPrice(serviceDetail.price_to)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                )}
              </Paper>

              {serviceDetail.location && (
                <Paper sx={{ p: 3, mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <LocationIcon /> Địa chỉ
                  </Typography>

                  {isEditing ? (
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <TextField
                        label="Địa chỉ chi tiết"
                        value={location}
                        onChange={(e) =>
                          setLocation(e.target.value)
                        }
                        fullWidth
                        multiline
                        rows={2}
                      />
                      <TextField
                        select
                        fullWidth
                        label="Xã/Quận"
                        value={selectWard}
                        onChange={(e) =>
                          setSelectWard(e.target.value as string)
                        }
                        SelectProps={{
                          displayEmpty: true,
                        }}
                        variant="outlined"
                        size="medium"
                      >
                        <MenuItem value="" disabled>
                          <em style={{ color: "#999" }}>Chọn Xã/Quận</em>
                        </MenuItem>

                        {wards.map((ward) => (
                          <MenuItem key={ward.code} value={ward.code}>
                            {ward.fullName}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        select
                        fullWidth
                        label="Thành phố/Tỉnh"
                        value={selectProvince}
                        onChange={(e) =>
                          setSelectProvince(e.target.value as string)
                        }
                        SelectProps={{
                          displayEmpty: true,
                        }}
                        variant="outlined"
                        size="medium"
                      >
                        <MenuItem value="" disabled>
                          <em style={{ color: "#999" }}>Chọn Thành phố/Tỉnh</em>
                        </MenuItem>

                        {provinces.map((province) => (
                          <MenuItem key={province.code} value={province.code}>
                            {province.fullName}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  ) : (
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Địa chỉ chi tiết
                        </Typography>
                        <Typography>
                          {serviceDetail.location.location}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          gap: 2,
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Phường/Xã
                          </Typography>
                          <Typography>
                            {serviceDetail.location.ward?.fullName || "N/A"}
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Tỉnh/Thành
                          </Typography>
                          <Typography>
                            {serviceDetail.location.ward?.province?.fullName ||
                              "N/A"}
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  )}
                </Paper>
              )}

              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <CheckIcon /> Tiện ích & Dịch vụ kèm theo
                </Typography>

                {isEditing ? (
                  <Box>
                    <Autocomplete
                      multiple
                      options={amenities}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.amenity}
                      value={selectedAmenities}
                      onChange={handleAmenitiesChange}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon />}
                            checkedIcon={<CheckBoxIcon />}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.amenity}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Chọn tiện ích"
                          placeholder="Tìm kiếm tiện ích"
                        />
                      )}
                      sx={{ width: "100%" }}
                    />

                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Debug: Selected {selectedAmenities?.length || 0}{" "}
                        amenities
                      </Typography>
                      {selectedAmenities && (
                        <Typography variant="caption" color="text.secondary">
                          IDs: {selectedAmenities.map((a) => a.id).join(", ")}
                        </Typography>
                      )}
                    </Box>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 1, display: "block" }}
                    >
                      Đã chọn: {selectedAmenities.length} tiện ích
                    </Typography>
                  </Box>
                ) : serviceDetail.amenities_hotels &&
                  serviceDetail.amenities_hotels.length > 0 ? (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {serviceDetail.amenities_hotels.map((amenity, index) => (
                      <Box
                        key={amenity.amenity?.id || index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          p: 1,
                          width: { xs: "100%", sm: "calc(50% - 8px)" },
                        }}
                      >
                        <CheckIcon
                          sx={{ color: "success.main", fontSize: 20 }}
                        />
                        <Typography>
                          {amenity.amenity?.amenity || `Tiện ích ${index + 1}`}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography color="text.secondary">
                    Chưa có tiện ích nào
                  </Typography>
                )}
              </Paper>

              {!isEditing && (
                <Paper sx={{ p: 3, mb: 3, bgcolor: "info.lighter" }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Thống kê
                  </Typography>
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <StarIcon sx={{ color: "warning.main" }} />
                        <Typography>Đánh giá trung bình</Typography>
                      </Box>
                      <Typography fontWeight="bold">
                        {serviceDetail.rating || 0}/5
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography>Số Đánh giá</Typography>
                      <Typography fontWeight="bold">
                        {serviceDetail.review || 0} lượt
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              )}

              {!isEditing && (
                <Paper sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <CalendarIcon /> Thông tin thời gian
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Ngày tạo
                      </Typography>
                      <Typography>
                        {formatDate(serviceDetail.createdAt)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Cập nhật lần cuối
                      </Typography>
                      <Typography>
                        {formatDate(serviceDetail.updatedAt)}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              )}
            </Box>
          ) : null}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, bgcolor: "grey.50" }}>
          {serviceDetail && (
            <>
              {isEditing ? (
                <>
                  <Button
                    onClick={handleCancel}
                    color="inherit"
                    startIcon={<CancelIcon />}
                    disabled={saving}
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleSave}
                    variant="contained"
                    startIcon={<SaveIcon />}
                    disabled={saving}
                  >
                    {saving ? <CircularProgress size={24} /> : "Lưu thay đổi"}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleDeleteService}
                    color="error"
                    startIcon={<DeleteIcon />}
                    disabled={saving}
                  >
                    Xóa dịch vụ
                  </Button>
                  <Button onClick={onClose} color="inherit">
                    Đóng
                  </Button>
                  <Button
                    onClick={handleEditToggle}
                    variant="contained"
                    startIcon={<EditIcon />}
                  >
                    Chỉnh sửa
                  </Button>
                </>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ServiceDetailModal;
