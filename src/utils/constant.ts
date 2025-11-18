export const API_URL = ''

export const MESSAGE = {
    SUCCESS: 'Thành công',
    ERROR: 'Đã xảy ra lỗi',
    NOT_FOUND: 'Không tìm thấy',
    UNAUTHORIZED: 'Không có quyền truy cập',
    FORBIDDEN: 'Không được phép',
    SERVER_ERROR: 'Lỗi máy chủ',
    DISCONNECTED: 'Mất kết nối với máy chủ',
}

export const ROLE = {
    USER: 'user',
    ADMIN: 'admin',
}

export const formatDateUTC = (input: string): string => {
  const d = new Date(input);

  const hours = d.getUTCHours().toString().padStart(2, "0");
  const minutes = d.getUTCMinutes().toString().padStart(2, "0");
  const day = d.getUTCDate().toString().padStart(2, "0");
  const month = (d.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = d.getUTCFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}