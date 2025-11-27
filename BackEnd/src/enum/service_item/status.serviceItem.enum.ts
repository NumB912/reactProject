export enum ServiceItemStatus {
  DRAFT        = 'DRAFT',        // Đang soạn thảo (chưa publish)
  PENDING      = 'PENDING',      // Đang chờ duyệt
  ACTIVE       = 'ACTIVE',       // Đang hoạt động, khách có thể book
  INACTIVE     = 'INACTIVE',     // Tạm ngừng bán (không hiển thị)
  REJECTED     = 'REJECTED',     // Bị từ chối duyệt
  ARCHIVED     = 'ARCHIVED',     // Đã lưu trữ (không dùng nữa)
  OUT_OF_STOCK = 'OUT_OF_STOCK', // Hết phòng / xe / vé (tạm thời)
  DELETED      = 'DELETED',      // Đã xóa mềm (soft delete)
}