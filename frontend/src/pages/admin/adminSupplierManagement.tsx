import { CheckCircle, Package, Plus, UserCheck, Search, Filter, MoreVertical, Eye, Edit, Trash2, CheckCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import api from "../../../API/api";
import { status } from "../../enum/status_user";
import ModalSupplierInfo from "./modelSupplier";
import { statusBecomeSupplier } from "../../enum/status_become.enum";


interface Supplier {
  id: string;
  Request_become_supplier: {
    company_name: string;
    status: string;
    create_at: string;
  };
  create_at: string;
  email: string;
  name: string;
  phone: string;
  update_at: string;
  status: string;
  _count: {
    services: number;
  };
  image?: {
    url: string;
  };
  location?: {
    location: string;
  };
  bio?: string;
}

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"view" | "edit" | "add">("view");
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    inactive: 0
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/admin/suppliers");
      const data = response.data.data || [];
      setSuppliers(data);
      calculateStats(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: Supplier[]) => {
    const stats = {
      total: data.length,
      active: data.filter(s => s.status === status.ACTIVE).length,
      pending: data.filter(s => s.status === status.PENDING).length,
      inactive: data.filter(s => s.status === status.UNACTIVE || s.status === status.BANNED).length
    };
    setStats(stats);
  };

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.Request_become_supplier.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      supplier.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setModalType("view");
    setShowModal(true);
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setModalType("edit");
    setShowModal(true);
  };

  const handleAddSupplier = () => {
    setSelectedSupplier(null);
    setModalType("add");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSupplier(null);
  };

  const handleUpdateSuccess = () => {
    fetchSuppliers();
  };

  const handleStatusChange = async (supplierId: string, newStatus: string) => {
    try {
      await api.put(`/admin/suppliers/${supplierId}/status`, {
        status: newStatus,
        reason: "Thay đổi bởi admin"
      });
      fetchSuppliers();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteSupplier = async (supplierId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?")) {
      try {
        await api.delete(`/admin/suppliers/${supplierId}`);
        fetchSuppliers();
      } catch (error) {
        console.error("Error deleting supplier:", error);
      }
    }
  };

  const getStatusConfig = (st?: string) => {
    switch (st) {
      case status.ACTIVE:
        return {
          label: "Hoạt động",
          color: "success",
        };
      case status.UNACTIVE:
        return {
          label: "Không hoạt động",
          color: "default",
        };
      case status.BANNED:
        return { label: "Bị cấm", color: "error"};
      default:
        return { label: "N/A", color: "default", icon: null };
    }
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 mt-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Quản lý nhà cung cấp
          </h1>
          <p className="text-gray-600">
            Quản lý thông tin nhà cung cấp và dịch vụ
          </p>
        </div>
        <button 
          onClick={handleAddSupplier}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm nhà cung cấp
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">Tổng nhà cung cấp</p>
              <p className="text-3xl font-bold mt-2">{stats.total}</p>
              <p className="text-sm mt-2 opacity-80">Toàn bộ nhà cung cấp</p>
            </div>
            <Package className="w-10 h-10 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">Hoạt động</p>
              <p className="text-3xl font-bold mt-2">{stats.active}</p>
              <p className="text-sm mt-2 opacity-80">
                {stats.total > 0 ? `${Math.round((stats.active / stats.total) * 100)}% tổng số` : "0%"}
              </p>
            </div>
            <CheckCircle className="w-10 h-10 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">Chờ xét duyệt</p>
              <p className="text-3xl font-bold mt-2">{stats.pending}</p>
              <p className="text-sm mt-2 opacity-80">Cần xử lý</p>
            </div>
            <UserCheck className="w-10 h-10 opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">Không hoạt động</p>
              <p className="text-3xl font-bold mt-2">{stats.inactive}</p>
              <p className="text-sm mt-2 opacity-80">Cần kiểm tra</p>
            </div>
            <UserCheck className="w-10 h-10 opacity-80" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm nhà cung cấp, email, tên công ty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value={status.ACTIVE}>Hoạt động</option>
                <option value={status.PENDING}>Chờ duyệt</option>
                <option value={status.UNACTIVE}>Không hoạt động</option>
                <option value={status.BANNED}>Bị cấm</option>
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            <button
              onClick={fetchSuppliers}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Làm mới
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nhà cung cấp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người liên hệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số dịch vụ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tham gia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 h-32">
              {filteredSuppliers.length > 0 ? (
                filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {supplier.Request_become_supplier.company_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: #{supplier.id.slice(0, 8)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                      <div className="text-sm text-gray-500">{supplier.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {supplier.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {supplier._count.services} dịch vụ
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(supplier.create_at)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusConfig(supplier.status).label}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewSupplier(supplier)}
                          className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditSupplier(supplier)}
                          className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSupplier(supplier.id)}
                          className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Xóa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="relative group">
                          <button className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                            <div className="py-1">
                              <button
                                onClick={() => handleStatusChange(supplier.id, status.ACTIVE)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Đánh dấu hoạt động
                              </button>
                              <button
                                onClick={() => handleStatusChange(supplier.id, status.UNACTIVE)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Đánh dấu không hoạt động
                              </button>
                              <button
                                onClick={() => handleStatusChange(supplier.id, status.BANNED)}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                Cấm tài khoản
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Package className="w-12 h-12 mb-4" />
                      <p className="text-lg font-medium text-gray-500">Không tìm thấy nhà cung cấp</p>
                      <p className="text-sm text-gray-400 mt-1">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>


        {filteredSuppliers.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Hiển thị <span className="font-medium">1-{filteredSuppliers.length}</span> trong tổng số{' '}
              <span className="font-medium">{filteredSuppliers.length}</span> nhà cung cấp
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                Trước
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && selectedSupplier && (
        <ModalSupplierInfo
          open={showModal}
          onClose={handleCloseModal}
          supplierId={selectedSupplier.id}
          modalType={modalType}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default SupplierManagement;