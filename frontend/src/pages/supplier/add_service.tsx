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
  CardMedia,
  CircularProgress,
  Button,
  Alert,
  Stack,
  Paper,
  TextField,
  MenuItem,
  Snackbar,
  Autocomplete,
  Checkbox,
  Chip,
} from "@mui/material";
import {
  Close as CloseIcon,
  AttachMoney as AttachMoneyIcon,
  LocationOn as LocationIcon,
  Image as ImageIcon,
  Check as CheckIcon,
  Hotel as HotelIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  CheckBox as CheckBoxIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import api from "../../../API/api";
import { formatUrlImg } from "../../utils/urlFormat";
import { statusService } from "../../enum/status_service.enum";
import { Province, Ward } from "../../store";
import { status } from "../../enum/status_user";
import { ServiceType } from "../../enum/type.service.enum";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceAdded?: () => void;
}

interface Amenity {
  id: string;
  amenity: string;
}

interface ServiceFormData {
  service_name: string;
  description: string;
  price_from: number;
  price_to: number;
  location: {
    ln: string; 
    ward_id: string;
    province_id: string;
  };
  status_id: string;
  amenities: string[]; 
  images: File[];
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  onServiceAdded,
}) => {
  const [formData, setFormData] = useState<ServiceFormData>({
    service_name: "",
    description: "",
    price_from: 0,
    price_to: 0,
    location: {
      ln: "",
      ward_id: "",
      province_id: "",
    },
    status_id: statusService.ACTIVE,
    amenities: [],
    images: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectProvince, setSelectProvince] = useState("");
  const [selectWard, setSelectWard] = useState("");

  useEffect(() => {
    if (isOpen) {
      fetchAmenities();
      fetchProvinces();
      resetForm();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!selectProvince) {
      setWards([]);
      setSelectWard("");
      return;
    }
    fetchWards(selectProvince);
  }, [selectProvince]);

  const fetchAmenities = async () => {
    try {
      const response = await api.get("/amenity-service");
      setAmenities(response.data.data || []);
    } catch (err) {
      console.error("Error fetching amenities:", err);
      setAmenities([
        { id: "1", amenity: "Wi-Fi miễn phí" },
        { id: "2", amenity: "Bể bơi" },
        { id: "3", amenity: "Phòng gym" },
        { id: "4", amenity: "Bữa sáng" },
        { id: "5", amenity: "Đỗ xe miễn phí" },
      ]);
    }
  };

  console.log(selectProvince)

  const fetchProvinces = async () => {
    try {
      const response = await api.get("/location/province", { params: { q: "" } });
      setProvinces(response.data.data || []);
    } catch (err) {
      console.error("Error fetching provinces:", err);
      setError("Không thể tải danh sách tỉnh/thành");
    }
  };

  const fetchWards = async (provinceCode: string) => {
    try {
      const response = await api.get("/location/ward", {
        params: { province_code: provinceCode },
      });
      setWards(response.data.data || response.data || []);
    } catch (err) {
      console.error("Error fetching wards:", err);
      setWards([]);
    }
  };

  const resetForm = () => {
    setFormData({
      service_name: "",
      description: "",
      price_from: 0,
      price_to: 0,
      location: {
        ln: "",
        ward_id: "",
        province_id: "",
      },
      status_id: statusService.ACTIVE,
      amenities: [],
      images: [],
    });
    setSelectedAmenities([]);
    setSelectProvince("");
    setSelectWard("");
    setError(null);
  };

  const handleInputChange = (field: keyof ServiceFormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleLocationChange = (field: keyof ServiceFormData['location'], value: string) => {
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [field]: value,
      },
    });
  };

  const handleProvinceChange = (provinceCode: string) => {
  setSelectProvince(provinceCode);
  setSelectWard("");
  setFormData({
    ...formData,
    location: {
      ...formData.location,
      province_id: provinceCode,
      ward_id: "", 
    },
  });
  fetchWards(provinceCode);
};

  const handleAmenitiesChange = (event: any, newValue: Amenity[]) => {
    setSelectedAmenities(newValue);
    const amenityIds = newValue.map(amenity => amenity.id);
    setFormData({
      ...formData,
      amenities: amenityIds,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setFormData({
        ...formData,
        images: [...formData.images, ...files],
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages,
    });
  };


  const handleWardChange = (wardCode: string) => {
    setSelectWard(wardCode);
    handleLocationChange('ward_id', wardCode);
  };

  const validateForm = (): boolean => {
      console.log(formData.location.province_id)
    if (!formData.service_name.trim()) {
      setError("Vui lòng nhập tên dịch vụ");
      return false;
    }

    if (formData.price_from <= 0 || formData.price_to <= 0) {
      setError("Giá dịch vụ phải lớn hơn 0");
      return false;
    }

    if (formData.price_to < formData.price_from) {
      setError("Giá cao nhất phải lớn hơn hoặc bằng giá thấp nhất");
      return false;
    }

    if (!formData.location.ln.trim()) {
      setError("Vui lòng nhập địa chỉ chi tiết");
      return false;
    }

    if (!formData.location.province_id) {
      setError("Vui lòng chọn tỉnh/thành phố");
      return false;
    }

    if (!formData.location.ward_id) {
      setError("Vui lòng chọn phường/xã");
      return false;
    }

    // Validate images
    if (formData.images.length === 0) {
      setError("Vui lòng thêm ít nhất một hình ảnh cho dịch vụ");
      return false;
    }

    // Validate file sizes (max 5MB each)
    for (const image of formData.images) {
      if (image.size > 5 * 1024 * 1024) {
        setError(`Hình ảnh "${image.name}" vượt quá kích thước cho phép (5MB)`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append("service_name", formData.service_name);
      formDataToSend.append("description", formData.description || "");
      formDataToSend.append("price_from", formData.price_from.toString());
      formDataToSend.append("price_to", formData.price_to.toString());
      formDataToSend.append("status_id", "ACTIVE");
      formDataToSend.append("service_type_id", ServiceType.HOTEL);
      formDataToSend.append("location", JSON.stringify(formData.location));
    
      for (const [key, value] of formDataToSend.entries()) {
        if (value instanceof File) {
          console.log(`${key}: File - ${value.name} (${value.size} bytes)`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      const response = await api.post("/supplier/services", formDataToSend);

      if (response.data.status === 200 || response.data.status === 201) {
        setSnackbar({
          open: true,
          message: "Thêm dịch vụ thành công",
          severity: "success",
        });
        
        resetForm();
        setTimeout(() => {
          onClose();
          if (onServiceAdded) {
            onServiceAdded();
          }
        }, 1500);
      } else {
        setError(response.data.message || "Thêm dịch vụ thất bại");
      }
    } catch (err: any) {
      console.error("Error adding service:", err);
      setError(
        err.response?.data?.message || 
        err.response?.data?.error || 
        "Đã xảy ra lỗi khi thêm dịch vụ"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const statusOptions = [
    { value: statusService.ACTIVE, label: "Hoạt động" },
    { value: statusService.INACTIVE, label: "Ngừng cung cấp" },
    { value: statusService.PENDING, label: "Đang chờ duyệt" },
  ];

  const formatPrice = (price: number): string => {
    if (!price) return "0 VNĐ";
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
  };

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
              Thêm dịch vụ mới
            </Typography>
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
          ) : (
            <Box>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <HotelIcon /> Thông tin cơ bản
                </Typography>
                
                <Stack spacing={2}>
                  <TextField
                    label="Tên dịch vụ *"
                    value={formData.service_name}
                    onChange={(e) => handleInputChange("service_name", e.target.value)}
                    fullWidth
                    required
                    error={!formData.service_name.trim()}
                    helperText={!formData.service_name.trim() ? "Tên dịch vụ là bắt buộc" : ""}
                  />
                  
                  <TextField
                    label="Mô tả dịch vụ"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Mô tả chi tiết về dịch vụ..."
                  />
                  
                  <TextField
                    select
                    label="Trạng thái *"
                    value={formData.status_id}
                    onChange={(e) => handleInputChange("status_id", e.target.value)}
                    fullWidth
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <ImageIcon /> Hình ảnh dịch vụ *
                </Typography>
                
                <Box>
                  {formData.images.length > 0 ? (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 2 }}>
                      {formData.images.map((file, index) => (
                        <Card key={index} sx={{ position: "relative", width: 150 }}>
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
                            onClick={() => handleRemoveImage(index)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                          <CardMedia
                            component="img"
                            height="120"
                            image={URL.createObjectURL(file)}
                            alt={`Hình ảnh ${index + 1}`}
                            sx={{ objectFit: "cover" }}
                          />
                          <Typography variant="caption" sx={{ p: 1, display: "block" }}>
                            {file.name}
                          </Typography>
                        </Card>
                      ))}
                    </Box>
                  ) : (
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Chưa có hình ảnh nào được chọn
                    </Alert>
                  )}
                  
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<AddIcon />}
                  >
                    {formData.images.length > 0 ? "Thêm thêm hình ảnh" : "Thêm hình ảnh"}
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </Button>
                  
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                    Đã chọn: {formData.images.length} hình ảnh
                  </Typography>
                </Box>
              </Paper>

              <Paper sx={{ p: 3, mb: 3, bgcolor: "primary.lighter" }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <AttachMoneyIcon /> Thông tin giá *
                </Typography>
                
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                    <TextField
                      label="Giá thấp nhất *"
                      type="number"
                      value={formData.price_from}
                      onChange={(e) => handleInputChange("price_from", parseFloat(e.target.value) || 0)}
                      fullWidth
                      InputProps={{
                        endAdornment: "VNĐ",
                        inputProps: { min: 0 }
                      }}
                      error={formData.price_from <= 0}
                      helperText={formData.price_from <= 0 ? "Giá phải lớn hơn 0" : ""}
                    />
                    
                    <TextField
                      label="Giá cao nhất *"
                      type="number"
                      value={formData.price_to}
                      onChange={(e) => handleInputChange("price_to", parseFloat(e.target.value) || 0)}
                      fullWidth
                      InputProps={{
                        endAdornment: "VNĐ",
                        inputProps: { min: formData.price_from }
                      }}
                      error={formData.price_to < formData.price_from}
                      helperText={formData.price_to < formData.price_from ? "Giá cao nhất phải ≥ giá thấp nhất" : ""}
                    />
                  </Box>
                  
                  {formData.price_from > 0 && formData.price_to > 0 && (
                    <Alert severity="info">
                      Khoảng giá: {formatPrice(formData.price_from)} - {formatPrice(formData.price_to)}
                    </Alert>
                  )}
                </Stack>
              </Paper>

              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <LocationIcon /> Địa chỉ *
                </Typography>
                
                <Stack spacing={2}>
                  <TextField
                    label="Địa chỉ chi tiết *"
                    value={formData.location.ln}
                    onChange={(e) => handleLocationChange("ln", e.target.value)}
                    fullWidth
                    multiline
                    rows={2}
                    placeholder="Số nhà, tên đường..."
                    error={!formData.location.ln.trim()}
                    helperText={!formData.location.ln.trim() ? "Địa chỉ chi tiết là bắt buộc" : ""}
                  />
                  
                  <TextField
                    select
                    fullWidth
                    label="Tỉnh/Thành phố *"
                    value={selectProvince}
                    onChange={(e) => handleProvinceChange(e.target.value as string)}
                    SelectProps={{ displayEmpty: true }}
                    error={!selectProvince}
                    helperText={!selectProvince ? "Vui lòng chọn tỉnh/thành phố" : ""}
                  >
                    <MenuItem value="" disabled>
                      <em style={{ color: "#999" }}>Chọn Tỉnh/Thành phố</em>
                    </MenuItem>
                    {provinces.map((province) => (
                      <MenuItem key={province.code} value={province.code}>
                        {province.fullName}
                      </MenuItem>
                    ))}
                  </TextField>
                  
                  <TextField
                    select
                    fullWidth
                    label="Phường/Xã *"
                    value={selectWard}
                    onChange={(e) => handleWardChange(e.target.value as string)}
                    SelectProps={{ displayEmpty: true }}
                    disabled={!selectProvince}
                    error={!selectWard}
                    helperText={!selectWard ? "Vui lòng chọn phường/xã" : ""}
                  >
                    <MenuItem value="" disabled>
                      <em style={{ color: "#999" }}>
                        {selectProvince ? "Chọn Phường/Xã" : "Vui lòng chọn tỉnh/thành trước"}
                      </em>
                    </MenuItem>
                    {wards.map((ward) => (
                      <MenuItem key={ward.code} value={ward.code}>
                        {ward.fullName}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </Paper>

              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <CheckIcon /> Tiện ích & Dịch vụ kèm theo
                </Typography>
                
                <Box>
                  <Autocomplete
                    multiple
                    options={amenities}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.amenity}
                    value={selectedAmenities}
                    onChange={handleAmenitiesChange}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
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
                  
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                    Đã chọn: {selectedAmenities.length} tiện ích
                  </Typography>
                  
                  {selectedAmenities.length > 0 && (
                    <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selectedAmenities.map((amenity) => (
                        <Chip
                          key={amenity.id}
                          label={amenity.amenity}
                          size="small"
                          onDelete={() => {
                            const newSelected = selectedAmenities.filter(a => a.id !== amenity.id);
                            setSelectedAmenities(newSelected);
                            setFormData({
                              ...formData,
                              amenities: newSelected.map(a => a.id),
                            });
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
              </Paper>
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2, bgcolor: "grey.50" }}>
          <Button
            onClick={onClose}
            color="inherit"
            startIcon={<CancelIcon />}
            disabled={saving}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={saving}
          >
            {saving ? <CircularProgress size={24} /> : "Thêm dịch vụ"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddServiceModal;