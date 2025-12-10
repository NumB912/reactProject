import React, { useEffect, useState } from "react";
import api from "../../../../../API/api";
import { Province, Ward } from "../../../../store";
import Select from "react-select";
import { Upload, X, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";

interface DocumentFile {
  file: File;
  previewUrl: string;
  name: string;
  size: number;
}

export default function BecomeSupplierPage() {
  const [propertyName, setPropertyName] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [location, setLocation] = useState("");
  const [selectProvince, setSelectProvince] = useState("");
  const [selectWard, setSelectWard] = useState("");
  const [selectType, setSelectType] = useState("");
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [serviceTypes, setServiceTypes] = useState<{ id: string; type: string }[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serviceName, setServiceName] = useState<string>("");
  const [loadingWard, setLoadingWard] = useState(false);
  const [taxFiles, setTaxFiles] = useState<DocumentFile[]>([]);
  const [businessFiles, setBusinessFiles] = useState<DocumentFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate()
  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!propertyName.trim()) newErrors.propertyName = "Vui lòng nhập tên doanh nghiệp";
    if (!location.trim()) newErrors.location = "Vui lòng nhập địa chỉ chi tiết";
    if (!selectProvince) newErrors.province = "Vui lòng chọn Tỉnh/Thành phố";
    if (!selectWard) newErrors.ward = "Vui lòng chọn Phường/Xã";
    if (!selectType) newErrors.serviceType = "Vui lòng chọn loại dịch vụ";
    if (!serviceName) newErrors.serviceName = "Vui lòng nhập tên dịch vụ";
    
    // Validate files
    if (taxFiles.length === 0) {
      newErrors.taxFiles = "Vui lòng upload giấy chứng nhận đăng ký thuế";
    }
    if (businessFiles.length === 0) {
      newErrors.businessFiles = "Vui lòng upload giấy phép kinh doanh";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    Promise.all([
      api.get("/location/province", { params: { q: "" } }),
      api.get("/service_type"),
    ])
      .then(([provRes, serviceRes]) => {
        setProvinces(provRes.data.data);
        setServiceTypes(serviceRes.data.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!selectProvince) {
      setWards([]);
      setSelectWard("");
      return;
    }

    setLoadingWard(true);
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
      })
      .finally(() => setLoadingWard(false));
  }, [selectProvince]);

  const handleFileUpload = (type: 'tax' | 'business', files: FileList | null) => {
    if (!files) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024;
    const maxCount = 4;

    const newFiles: DocumentFile[] = [];
    
    for (let i = 0; i < Math.min(files.length, maxCount); i++) {
      const file = files[i];

      if (!allowedTypes.includes(file.type)) {
        alert(`File ${file.name}: Chỉ chấp nhận JPG, PNG hoặc PDF`);
        continue;
      }

      if (file.size > maxSize) {
        alert(`File ${file.name}: Không được vượt quá 5MB`);
        continue;
      }

      const previewUrl = URL.createObjectURL(file);
      newFiles.push({
        file,
        previewUrl,
        name: file.name,
        size: file.size
      });
    }

    if (type === 'tax') {
      const totalFiles = taxFiles.length + newFiles.length;
      if (totalFiles > maxCount) {
        alert(`Chỉ được upload tối đa ${maxCount} file cho giấy chứng nhận thuế`);
        return;
      }
      setTaxFiles(prev => [...prev, ...newFiles]);
      if (errors.taxFiles) {
        setErrors(prev => ({ ...prev, taxFiles: '' }));
      }
    } else {
      const totalFiles = businessFiles.length + newFiles.length;
      if (totalFiles > maxCount) {
        alert(`Chỉ được upload tối đa ${maxCount} file cho giấy phép kinh doanh`);
        return;
      }
      setBusinessFiles(prev => [...prev, ...newFiles]);
      if (errors.businessFiles) {
        setErrors(prev => ({ ...prev, businessFiles: '' }));
      }
    }
  };

  const handleRemoveFile = (type: 'tax' | 'business', index: number) => {
    if (type === 'tax') {
      const fileToRemove = taxFiles[index];
      URL.revokeObjectURL(fileToRemove.previewUrl);
      setTaxFiles(prev => prev.filter((_, i) => i !== index));
    } else {
      const fileToRemove = businessFiles[index];
      URL.revokeObjectURL(fileToRemove.previewUrl);
      setBusinessFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitMessage(null);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("tax_code", taxCode);
      formData.append("property_name", propertyName);
      formData.append("type_service", selectType);
      formData.append("location", location);
      formData.append("ward_id", selectWard);

      taxFiles.forEach((fileObj, index) => {
        formData.append("tax_file", fileObj.file);
      });


      businessFiles.forEach((fileObj, index) => {
        formData.append("business_file", fileObj.file);
      });


      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await api.post("/user/become-supplier", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setProgress(percentCompleted);
        }
      }).then((res)=>{
              setSubmitMessage({
        type: 'success',
        text: 'Đã gửi yêu cầu thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.'
      });
      navigate("/profile")
      }).catch(error=>{
         setSubmitMessage({
        type: 'error',
        text: 'Chưa thể gửi yêu cầu'
      });
      });

      clearInterval(progressInterval);
      setProgress(100);
    
      setTimeout(() => {
        resetForm();
      }, 3000);

    } catch (error: any) {
      console.error("Submission error:", error);
      setSubmitMessage({
        type: 'error',
        text: error.response?.data?.message || 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại!'
      });
    } finally {
      setIsSubmitting(false);
      setProgress(0);
    }
  };

  const resetForm = () => {
    setPropertyName("");
    setTaxCode("");
    setLocation("");
    setSelectProvince("");
    setSelectWard("");
    setSelectType("");
    
    // Clean up object URLs
    taxFiles.forEach(file => URL.revokeObjectURL(file.previewUrl));
    businessFiles.forEach(file => URL.revokeObjectURL(file.previewUrl));
    
    setTaxFiles([]);
    setBusinessFiles([]);
    setErrors({});
  };

  const renderFileUploadSection = (
    title: string,
    type: 'tax' | 'business',
    files: DocumentFile[],
    errorKey: string
  ) => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{title} <span className="text-red-500">*</span></h3>
          <span className="text-sm text-gray-500">
            Đã upload: {files.length}/4 file
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* File preview cards */}
          {files.map((fileObj, index) => (
            <div key={index} className="border rounded-lg overflow-hidden bg-white group">
              <div className="relative aspect-square bg-gray-100">
                {fileObj.file.type.startsWith('image/') ? (
                  <img 
                    src={fileObj.previewUrl} 
                    alt={fileObj.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <FileText size={48} className="text-gray-400" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveFile(type, index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 truncate" title={fileObj.name}>
                  {fileObj.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(fileObj.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ))}
          
          {/* Upload button - show if less than 4 files */}
          {files.length < 4 && (
            <label className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors aspect-square">
              <div className="flex flex-col items-center justify-center p-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="text-sm font-medium text-gray-600">Thêm file</p>
                <p className="text-xs text-gray-500 mt-1">Tối đa {4 - files.length} file</p>
              </div>
              <input
                type="file"
                className="hidden"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(type, e.target.files)}
              />
            </label>
          )}
        </div>
        
        {errors[errorKey] && (
          <p className="text-red-500 text-sm mt-1">{errors[errorKey]}</p>
        )}
        
        <p className="text-sm text-gray-500">
          Chấp nhận: PDF, JPG, PNG (tối đa 5MB/file)
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Trở thành nhà cung cấp cùng chúng tôi
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Điền đầy đủ thông tin và upload tài liệu cần thiết để chúng tôi xét duyệt hồ sơ của bạn
          </p>
        </div>

        {isSubmitting && (
          <div className="mb-6 bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Đang gửi yêu cầu...</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{progress}% hoàn thành</p>
              </div>
            </div>
          </div>
        )}

        {submitMessage && !isSubmitting && (
          <div className={`mb-6 p-4 rounded-xl ${submitMessage.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-center gap-3">
              {submitMessage.type === 'success' ? (
                <CheckCircle className="text-green-600" size={24} />
              ) : (
                <AlertCircle className="text-red-600" size={24} />
              )}
              <div>
                <p className={`font-medium ${submitMessage.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                  {submitMessage.text}
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Thông tin cơ bản */}
            <div className="space-y-6">
              <div className="pb-4 border-b">
                <h2 className="text-2xl font-semibold text-gray-800">Thông tin cơ bản</h2>
                <p className="text-gray-600 mt-2">Thông tin cá nhân và doanh nghiệp của bạn</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên cá nhân / Doanh nghiệp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="VD: Công ty TNHH ABC"
                  />
                  {errors.propertyName && <p className="text-red-500 text-sm mt-1">{errors.propertyName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên dịch vụ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="VD: Khách sạn ABC"
                  />
                  {errors.serviceName && <p className="text-red-500 text-sm mt-1">{errors.serviceName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mã số thuế</label>
                    <input
                      type="text"
                      value={taxCode}
                      onChange={(e) => setTaxCode(e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0123456789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loại dịch vụ <span className="text-red-500">*</span>
                    </label>
                    <Select
                      placeholder="Chọn loại dịch vụ"
                      options={serviceTypes.map((s) => ({ label: s.type, value: s.id }))}
                      onChange={(opt) => setSelectType(opt?.value || "")}
                      classNamePrefix="select"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Địa chỉ */}
            <div className="space-y-6">
              <div className="pb-4 border-b">
                <h2 className="text-2xl font-semibold text-gray-800">Địa chỉ</h2>
                <p className="text-gray-600 mt-2">Địa chỉ kinh doanh của doanh nghiệp</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ chi tiết <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Số nhà, đường, tòa nhà..."
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tỉnh/Thành phố <span className="text-red-500">*</span>
                    </label>
                    <Select
                      placeholder="Chọn Tỉnh/Thành phố"
                      options={provinces.map((p) => ({ label: p.name, value: p.code }))}
                      onChange={(opt) => setSelectProvince(opt?.value || "")}
                      classNamePrefix="select"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phường/Xã <span className="text-red-500">*</span>
                    </label>
                    <Select
                      isLoading={loadingWard}
                      placeholder="Chọn Phường/Xã"
                      options={wards.map((w) => ({ label: w.name, value: w.code }))}
                      onChange={(opt) => setSelectWard(opt?.value || "")}
                      classNamePrefix="select"
                      className="focus:ring-2 focus:ring-blue-500"
                      isDisabled={!selectProvince}
                    />
                    {errors.ward && <p className="text-red-500 text-sm mt-1">{errors.ward}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Tài liệu đính kèm */}
            <div className="space-y-8">
              <div className="pb-4 border-b">
                <h2 className="text-2xl font-semibold text-gray-800">Tài liệu đính kèm</h2>
                <p className="text-gray-600 mt-2">Upload các tài liệu cần thiết (tối đa 4 file cho mỗi loại)</p>
              </div>

              <div className="space-y-8">
                {renderFileUploadSection(
                  "Giấy chứng nhận đăng ký thuế (Mẫu số 03/ĐK-TCT)",
                  'tax',
                  taxFiles,
                  'taxFiles'
                )}
                
                {renderFileUploadSection(
                  "Giấy phép kinh doanh",
                  'business',
                  businessFiles,
                  'businessFiles'
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-blue-600 mt-0.5" size={20} />
                  <div>
                    <p className="text-blue-800 font-medium">Lưu ý quan trọng:</p>
                    <ul className="text-blue-700 text-sm mt-1 space-y-1 list-disc pl-4">
                      <li>Cả hai loại tài liệu đều là <span className="font-semibold">bắt buộc</span></li>
                      <li>Có thể upload tối đa 4 file cho mỗi loại tài liệu</li>
                      <li>File phải rõ nét, đầy đủ thông tin và còn hiệu lực</li>
                      <li>Định dạng chấp nhận: PDF, JPG, PNG (tối đa 5MB/file)</li>
                      <li>Quá trình xét duyệt có thể mất 3-5 ngày làm việc</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Nút submit */}
            <div className="pt-6 border-t">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    Bằng cách nhấn "Gửi yêu cầu", bạn đồng ý với các điều khoản và chính sách của chúng tôi
                  </p>
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Xóa tất cả
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <Upload size={20} />
                        Gửi yêu cầu đăng ký
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}