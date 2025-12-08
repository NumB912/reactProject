import { Calendar, CheckSquare, ChevronDown, Download, Edit, Package, UserCheck, Users } from "lucide-react";
import React from "react";
 const Dashboard = () => {
  const stats = [
    { title: 'Tổng người dùng', value: '1,254', change: '+12%' },
    { title: 'Nhà cung cấp', value: '89', change: '+5%' },
    { title: 'Dịch vụ', value: '347', change: '+8%' },
    { title: 'Yêu cầu chờ duyệt', value: '23', change: '-3%' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tổng quan hệ thống</h1>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
          
            Tháng này
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
           
            Xuất báo cáo
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} so với tháng trước
                </p>
              </div>
              <div className={`${stat} p-3 rounded-lg`}>
                {/* <div className="text-white">{stat}</div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Hoạt động gần đây</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800">Xem tất cả</button>
          </div>
          
          <div className="space-y-4">
            {[
              { user: 'Nguyễn Văn A', action: 'gửi yêu cầu trở thành nhà cung cấp', time: '10 phút trước' },
              { user: 'Trần Thị B', action: 'đăng ký tài khoản mới', time: '2 giờ trước' },
              { user: 'Công ty XYZ', action: 'thêm dịch vụ mới', time: '5 giờ trước'},
              { user: 'Lê Văn C', action: 'cập nhật thông tin dịch vụ', time: '1 ngày trước' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="p-2 bg-blue-50 rounded-lg mr-3">
                  {/* <div className="text-blue-600">{activity.icon}</div> */}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">{activity.user}</span> đã {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Thống kê nhanh</h2>
          
          <div className="space-y-4">
            {[
              { label: 'Người dùng mới hôm nay', value: '12', percent: 60, color: 'bg-blue-500' },
              { label: 'Yêu cầu được duyệt', value: '8', percent: 40, color: 'bg-green-500' },
              { label: 'Dịch vụ mới', value: '5', percent: 30, color: 'bg-purple-500' },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${item.color} h-2 rounded-full`} 
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard