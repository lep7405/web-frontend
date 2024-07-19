import axios from 'axios'

const axiosClient = axios.create({
 
  // withCredentials: true, // Để request gửi kèm cookie
})

axiosClient.interceptors.request.use(async (config) => {
 
  let accessToken = localStorage.getItem("token")
  config.headers.Authorization = 'Bearer ' + accessToken
  return config
},)
axiosClient.interceptors.response.use(
  (response) => {
    // Trả về dữ liệu nếu không có lỗi
    return response;
  },
  async (error) => {
    const { response } = error;
    // Kiểm tra nếu response trả về mã lỗi 401 Unauthorized
    if (response && response.status === 401) {
      // Thực hiện refresh token
      const res = await axios.get("http://localhost:5001/user/refreshToken",{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
        }
      });
      console.log(res)
      if (res.data.newToken) {
        // Nếu refresh token thành công, cập nhật lại access token và thử gửi lại request gốc
        localStorage.setItem('token',res.data.newToken);
        localStorage.setItem('refreshToken', res.data.newRefreshToken);
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${res.data.newToken}`;
        return axios(originalRequest);
      } else {
        // Nếu refresh token không thành công, xử lý tại đây (ví dụ: đăng xuất người dùng, đưa họ về trang đăng nhập)
        // Đoạn mã xử lý tại đây
      }
    }
    // Trả về lỗi nếu không phải lỗi 401 Unauthorized
    return Promise.reject(error);
  }
);
export default axiosClient;