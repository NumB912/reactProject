import { Edit, Eye, Filter, Plus, Search, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import api from "../../../API/api";
import { User } from "../../model/user";
import { Pagination } from "../../model/pagination";
import { generatePageNumbers } from "../../utils/pagination";
import ModalUserMoreInfo from "./modelUserMoreInfo";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectUser,setSelectUser] = useState<string>("")
  const [isShow,setIsShow] = useState<boolean>(false)
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 5,
    totalPage: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const fetchUsers = () => {
    setLoading(true);
    api.get("/admin/user", {
      params: {
        search: search || undefined,
        role: roleFilter !== "all" ? roleFilter : undefined,
        page: pagination.page,
        limit: pagination.limit,
        sortBy: "name",
        sortOrder: "asc",
      }
    })
    .then((res) => {
      console.log(res)
      setUsers(res.data.data || []); 
      setPagination(res.data.pagination || {
        total: 0,
        page: 1,
        limit: 10,
        totalPage: 0,
        hasNextPage: false,
        hasPrevPage: false,
      });
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const onSuccessUpdateOrSomeThing = ()=>{

  }

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter, pagination.page, pagination.limit]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);


  const handleFilterChange = (type: string, value: string) => {
    if (type === 'role') {
      setRoleFilter(value);
    } 
    setPagination(prev => ({ ...prev, page: 1 }));
  };


  const onPageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      page: page,
    }));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value);
    setPagination((prev) => ({
      ...prev,
      limit: newLimit,
      page: 1, 
    }));
  };


  const getRoleBadgeColor = (roleName: string) => {
    switch (roleName?.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "supplier":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "user":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Quản lý người dùng
          </h1>
          <p className="text-gray-600">
            Quản lý và theo dõi người dùng hệ thống
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Thêm người dùng
        </button>
      </div>

      {/* Filter và Search Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => handleFilterChange('role', e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white outline-none"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="admin">Quản trị viên</option>
              <option value="supplier">Nhà cung cấp</option>
              <option value="user">Người dùng</option>
            </select>

            <button
              onClick={() => {
                setSearch("");
                setRoleFilter("all");
                setPagination(prev => ({ ...prev, page: 1 }));
              }}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            {loading ? (
              <div className="flex items-center text-blue-600">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                Đang tải dữ liệu...
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                Tổng cộng: <span className="font-semibold">{pagination.total} người dùng</span>
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Hiển thị:</span>
              <select
                value={pagination.limit}
                onChange={handleLimitChange}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white outline-none text-sm"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span className="text-sm text-gray-600">mỗi trang</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải dữ liệu người dùng...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Không tìm thấy người dùng
            </h3>
            <p className="text-gray-500">
              {search || roleFilter !== "all"
                ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
                : "Chưa có người dùng nào trong hệ thống"}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Người dùng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số điện thoại
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vai trò
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày tham gia
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{user?.id?.slice(0, 8)+"..." || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-bold">
                              {user.name
                                ? user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase()
                                : "U"}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium block">{user.name || "N/A"}</span>
                            <span className="text-xs text-gray-500">@{user.email || "N/A"}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.email || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {user.phone || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role?.name??"user")}`}>
                          {user.role?.name || "N/A"}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.create_at ? new Date(user.create_at).toLocaleDateString('vi-VN') : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            onClick={()=>{setIsShow(true) 
                              console.log(user.id)
                             setSelectUser(user.id)}}
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Hiển thị{" "}
                <span className="font-semibold">
                  {Math.min((pagination.page - 1) * pagination.limit + 1, pagination.total)} -{" "}
                  {Math.min(pagination.page * pagination.limit, pagination.total)}
                </span>{" "}
                trên tổng số <span className="font-semibold">{pagination.total}</span> người dùng
              </div>
              
              <div className="flex items-center space-x-2">

                <button
                  onClick={() => onPageChange(pagination.page - 1)}
                  disabled={!pagination.hasPrevPage}
                  className={`p-2 rounded-lg transition-colors ${
                    pagination.hasPrevPage
                      ? "hover:bg-gray-100 text-gray-700"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {generatePageNumbers(pagination.page,pagination.totalPage).map((pageNum, idx) => (
                  <button
                    key={idx}
                    onClick={() => typeof pageNum === "number" && onPageChange(pageNum)}
                    disabled={pageNum === "..."}
                    className={`min-w-[40px] h-10 rounded-lg font-medium transition-all ${
                      pageNum === pagination.page
                        ? "bg-blue-600 text-white shadow-md"
                        : pageNum === "..."
                        ? "text-gray-400 cursor-default"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  onClick={() => onPageChange(pagination.page + 1)}
                  disabled={!pagination.hasNextPage}
                  className={`p-2 rounded-lg transition-colors ${
                    pagination.hasNextPage
                      ? "hover:bg-gray-100 text-gray-700"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <ModalUserMoreInfo onClose={()=>{setIsShow(false)}} onUpdateSuccess={onSuccessUpdateOrSomeThing} open={isShow} userId={selectUser}/>
    </div>
  );
};

export default UserManagement;