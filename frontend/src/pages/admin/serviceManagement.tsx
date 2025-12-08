import { Edit, Filter, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import api from "../../../API/api";
const ServiceManagement = () => {
  const [services] = useState([
    { id: 1, name: 'Dịch vụ thiết kế website', supplier: 'Công ty ABC', category: 'Công nghệ', price: '5,000,000 VNĐ', status: 'active' },
    { id: 2, name: 'Dịch vụ tư vấn pháp lý', supplier: 'Công ty XYZ', category: 'Pháp lý', price: '3,000,000 VNĐ', status: 'active' },
    { id: 3, name: 'Dịch vụ marketing online', supplier: 'Công ty DEF', category: 'Marketing', price: '7,000,000 VNĐ', status: 'inactive' },
    { id: 4, name: 'Dịch vụ đào tạo', supplier: 'Công ty GHI', category: 'Giáo dục', price: '2,500,000 VNĐ', status: 'active' },
  ]);

  useEffect(()=>{
    api.get("/admin/suppliers").then((res)=>{
      console.log(res)
    })
  },[])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý dịch vụ nhà cung cấp</h1>
          <p className="text-gray-600">Quản lý tất cả dịch vụ được cung cấp trên hệ thống</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Lọc dịch vụ
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Thêm dịch vụ
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Danh mục dịch vụ</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
              <option>Tất cả danh mục</option>
              <option>Công nghệ</option>
              <option>Pháp lý</option>
              <option>Marketing</option>
              <option>Giáo dục</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
              <option>Tất cả trạng thái</option>
              <option>Hoạt động</option>
              <option>Ngừng cung cấp</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nhà cung cấp</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
              <option>Tất cả nhà cung cấp</option>
              <option>Công ty ABC</option>
              <option>Công ty XYZ</option>
              <option>Công ty DEF</option>
              <option>Công ty GHI</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Áp dụng bộ lọc
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map(service => (
          <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800">{service.name}</h3>
                <p className="text-gray-600 text-sm mt-1">Nhà cung cấp: {service.supplier}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                service.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
              }`}>
                {service.status === 'active' ? 'Hoạt động' : 'Ngừng cung cấp'}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {service.category}
              </span>
              <div className="text-lg font-bold text-gray-800">{service.price}</div>
            </div>
            
            <div className="flex justify-between pt-4 border-t border-gray-100">
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium">
                Xem chi tiết
              </button>
              <div className="flex space-x-2">
                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceManagement