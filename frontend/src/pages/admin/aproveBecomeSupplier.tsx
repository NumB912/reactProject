import { CheckCircle, Eye, UserCheck, XCircle, Loader2, RefreshCw } from "lucide-react";
import React, { useEffect, useState } from "react";
import api from "../../../API/api";
import { statusBecomeSupplier } from "../../enum/status_become.enum";
import { request } from "../../model/request";
import ModalUserManagement from "./modelBecomeSupplierManagement";
import ModalBecomeSupplierManagement from "./modelBecomeSupplierManagement";

const ApprovalManagement = () => {
  const [requests, setRequests] = useState<request[]>([]);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<request | null>(null);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'CANCEL'>('ALL');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    setIsRefreshing(true);
    api
      .get("admin/RequestBecomeSupplier")
      .then((res) => {
        setRequests(res.data.data?.requests || []);
        const pending = (res.data.data?.requests || []).filter(r => r.status === "PENDING").length;
        const approved = (res.data.data?.requests || []).filter(r => r.status === "APPROVED").length;
        const rejected = (res.data.data?.requests || []).filter(r => r.status === "CANCEL").length;
        setStats({ pending, approved, rejected });
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  };

  const handleOpenModal = (request: request) => {
    setSelectedRequest(request);
    setModalOpen(true);
  };

  const handleRequest = (
    statusBecomeSupplier: statusBecomeSupplier,
    id: string
  ) => {
    setLoadingStates(prev => ({ ...prev, [id]: true }));

    api
      .post("admin/handle-become-supplier", {
        id: id,
        status_id: statusBecomeSupplier,
      })
      .then((res) => {
        setRequests(prev => prev.map(request => {
          if (request.id === id) {
            return {
              ...request,
              status: statusBecomeSupplier,
              process_at: new Date().toISOString(),
            };
          }
          return request;
        }));

        const updatedRequests = requests.map(r => 
          r.id === id ? { ...r, status: statusBecomeSupplier } : r
        );
        
        const pending = updatedRequests.filter(r => r.status === "PENDING").length;
        const approved = updatedRequests.filter(r => r.status === "APPROVED").length;
        const rejected = updatedRequests.filter(r => r.status === "CANCEL").length;
        
        setStats({ pending, approved, rejected });

        alert(
          statusBecomeSupplier === statusBecomeSupplier.APPROVED 
            ? " Đã duyệt yêu cầu thành công!" 
            : " Đã từ chối yêu cầu thành công!"
        );

        setTimeout(() => {
          fetchRequests();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error handling request:", error);
        alert("Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại!");
      })
      .finally(() => {
        setLoadingStates(prev => ({ ...prev, [id]: false }));
      });
  };

  const filteredRequests = requests.filter(request => {
    if (activeFilter === 'ALL') return true;
    return request.status === activeFilter;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Xét duyệt yêu cầu trở thành nhà cung cấp
          </h1>
          <p className="text-gray-600">
            Xem xét và phê duyệt yêu cầu từ người dùng
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            <span className="font-semibold text-lg text-blue-600">
              {stats.pending}
            </span>{" "}
            <span className="text-gray-600">yêu cầu chờ xử lý</span>
          </div>
          
          <button
            onClick={fetchRequests}
            disabled={isRefreshing}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium flex items-center text-sm transition-colors"
          >
            {isRefreshing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            {isRefreshing ? "Đang tải..." : "Làm mới"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng yêu cầu</p>
              <p className="text-2xl font-bold text-gray-800">{requests.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600 mb-1">Chờ duyệt</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600 mb-1">Đã duyệt</p>
              <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600 mb-1">Đã từ chối</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeFilter === 'ALL'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tất cả ({requests.length})
          </button>
          <button
            onClick={() => setActiveFilter('PENDING')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeFilter === 'PENDING'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Chờ duyệt ({stats.pending})
          </button>
          <button
            onClick={() => setActiveFilter('APPROVED')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeFilter === 'APPROVED'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Đã duyệt ({stats.approved})
          </button>
          <button
            onClick={() => setActiveFilter('CANCEL')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeFilter === 'CANCEL'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Đã từ chối ({stats.rejected})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Danh sách yêu cầu
                {activeFilter !== 'ALL' && (
                  <span className="text-sm font-normal text-gray-600 ml-2">
                    ({filteredRequests.length})
                  </span>
                )}
              </h2>
              
              {isRefreshing && (
                <div className="flex items-center text-sm text-blue-600">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang tải dữ liệu...
                </div>
              )}
            </div>

            <div className="divide-y divide-gray-200">
              {filteredRequests.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <UserCheck className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Không có yêu cầu nào
                  </h3>
                  <p className="text-gray-500">
                    {activeFilter !== 'ALL' 
                      ? `Không có yêu cầu nào ở trạng thái ${activeFilter === 'PENDING' ? 'chờ duyệt' : activeFilter === 'APPROVED' ? 'đã duyệt' : 'đã từ chối'}`
                      : 'Chưa có yêu cầu nào được gửi đến'}
                  </p>
                </div>
              ) : (
                filteredRequests.map((request) => {
                  const isPending = request.status === "PENDING";
                  const isApproved = request.status === "APPROVED";
                  const isRejected = request.status === "CANCEL";
                  const isLoading = loadingStates[request.id] || false;

                  return (
                    <div 
                      key={request.id} 
                      className={`p-6 hover:bg-gray-50 transition-all duration-200 ${
                        isLoading ? 'opacity-70 pointer-events-none' : ''
                      }`}
                    >

                      {isLoading && (
                        <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center rounded-lg z-10">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                            <span className="text-sm text-blue-600 font-medium">
                              Đang xử lý...
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="relative">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-start">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                                isApproved
                                  ? "bg-gradient-to-r from-green-400 to-green-500"
                                  : isRejected
                                  ? "bg-gradient-to-r from-red-400 to-red-500"
                                  : "bg-gradient-to-r from-blue-400 to-blue-500"
                              }`}
                            >
                              {isApproved ? (
                                <CheckCircle className="w-6 h-6 text-white" />
                              ) : isRejected ? (
                                <XCircle className="w-6 h-6 text-white" />
                              ) : (
                                <UserCheck className="w-6 h-6 text-white" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                  ID: {request.id.slice(0, 8)}...
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm mb-1">
                                {request.person?.email || "N/A"}
                              </p>
                              <p className="text-gray-600 text-sm">
                                Công ty: {request.company_name || "N/A"}
                              </p>

                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                isPending
                                  ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                  : isApproved
                                  ? "bg-green-100 text-green-800 border border-green-200"
                                  : "bg-red-100 text-red-800 border border-red-200"
                              }`}
                            >
                              {isPending
                                ? "🕐 Chờ duyệt"
                                : isApproved
                                ? "✅ Đã duyệt"
                                : "❌ Đã từ chối"}
                            </span>
                            
                            {request.process_at && (
                              <span className="text-xs text-gray-500 text-right">
                                Xử lý: {new Date(request.process_at).toLocaleDateString('vi-VN')}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            <span className="font-medium">Ngày gửi:</span>{" "}
                            {request.create_at
                              ? new Date(request.create_at).toLocaleDateString("vi-VN")
                              : "N/A"}
                          </div>

                          <div className="flex space-x-2">
                            {isPending ? (
                              <>
                                <button
                                  disabled={isLoading}
                                  className={`px-4 py-2 rounded-lg font-medium flex items-center transition-all duration-200 ${
                                    isLoading
                                      ? 'bg-green-100 text-green-400 cursor-not-allowed'
                                      : 'bg-green-50 text-green-600 hover:bg-green-100 hover:shadow'
                                  }`}
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        `Xác nhận DUYỆT yêu cầu từ ${request.person?.email}?`
                                      )
                                    ) {
                                      handleRequest(
                                        statusBecomeSupplier.APPROVED,
                                        request.id
                                      );
                                    }
                                  }}
                                >
                                  {isLoading ? (
                                    <>
                                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                      Đang xử lý...
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Duyệt
                                    </>
                                  )}
                                </button>
                                
                                <button
                                  disabled={isLoading}
                                  className={`px-4 py-2 rounded-lg font-medium flex items-center transition-all duration-200 ${
                                    isLoading
                                      ? 'bg-red-100 text-red-400 cursor-not-allowed'
                                      : 'bg-red-50 text-red-600 hover:bg-red-100 hover:shadow'
                                  }`}
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        `Xác nhận TỪ CHỐI yêu cầu từ ${request.person?.email}?`
                                      )
                                    ) {
                                      handleRequest(
                                        statusBecomeSupplier.CANCEL,
                                        request.id
                                      );
                                    }
                                  }}
                                >
                                  {isLoading ? (
                                    <>
                                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                      Đang xử lý...
                                    </>
                                  ) : (
                                    <>
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Từ chối
                                    </>
                                  )}
                                </button>
                              </>
                            ) : (
                              <div
                                className={`px-4 py-2 rounded-lg font-medium border ${
                                  isApproved
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                                }`}
                              >
                                <div className="flex items-center">
                                  {isApproved ? (
                                    <>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Đã duyệt
                                    </>
                                  ) : (
                                    <>
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Đã từ chối
                                    </>
                                  )}
                                </div>
                              </div>
                            )}

                            <button 
                              className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors flex items-center"
                              onClick={() => handleOpenModal(request)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Chi tiết
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Hướng dẫn xét duyệt
            </h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-xs font-bold">1</span>
                </div>
                <p className="text-sm text-gray-700">
                  Kiểm tra thông tin cá nhân và công ty của người đăng ký
                </p>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-xs font-bold">2</span>
                </div>
                <p className="text-sm text-gray-700">
                  Xác minh tính hợp lệ của tài liệu đính kèm
                </p>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-xs font-bold">3</span>
                </div>
                <p className="text-sm text-gray-700">
                  Đánh giá kinh nghiệm và năng lực cung cấp dịch vụ
                </p>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-xs font-bold">4</span>
                </div>
                <p className="text-sm text-gray-700">
                  Phê duyệt hoặc từ chối yêu cầu với lý do cụ thể
                </p>
              </div>
            </div>
          </div>

          {/* Thống kê xét duyệt */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <h2 className="text-lg font-semibold mb-6">Thống kê xét duyệt</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Đã duyệt</span>
                  <span className="font-bold">{stats.approved}</span>
                </div>
                <div className="w-full bg-blue-400 rounded-full h-2">
                  <div 
                    className="bg-green-300 h-2 rounded-full transition-all duration-500" 
                    style={{ 
                      width: requests.length > 0 ? `${(stats.approved / requests.length) * 100}%` : '0%',
                      maxWidth: '100%'
                    }}
                  ></div>
                </div>
                <p className="text-xs text-blue-100 mt-1">
                  Tỷ lệ: {requests.length > 0 ? ((stats.approved / requests.length) * 100).toFixed(1) : 0}%
                </p>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Chờ xử lý</span>
                  <span className="font-bold">{stats.pending}</span>
                </div>
                <div className="w-full bg-blue-400 rounded-full h-2">
                  <div 
                    className="bg-yellow-300 h-2 rounded-full transition-all duration-500" 
                    style={{ 
                      width: requests.length > 0 ? `${(stats.pending / requests.length) * 100}%` : '0%',
                      maxWidth: '100%'
                    }}
                  ></div>
                </div>
                <p className="text-xs text-blue-100 mt-1">
                  Tỷ lệ: {requests.length > 0 ? ((stats.pending / requests.length) * 100).toFixed(1) : 0}%
                </p>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Đã từ chối</span>
                  <span className="font-bold">{stats.rejected}</span>
                </div>
                <div className="w-full bg-blue-400 rounded-full h-2">
                  <div 
                    className="bg-red-300 h-2 rounded-full transition-all duration-500" 
                    style={{ 
                      width: requests.length > 0 ? `${(stats.rejected / requests.length) * 100}%` : '0%',
                      maxWidth: '100%'
                    }}
                  ></div>
                </div>
                <p className="text-xs text-blue-100 mt-1">
                  Tỷ lệ: {requests.length > 0 ? ((stats.rejected / requests.length) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalBecomeSupplierManagement open={modalOpen} onClose={()=>(setModalOpen(false))} id={selectedRequest?.id}/>
    </div>
  );
};

export default ApprovalManagement;