import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
    // const navigate=useNavigate()
    const { response } = error;
    console.log("hello")
    // Kiểm tra nếu response trả về mã lỗi 401 Unauthorized
    if (response && response.status === 404) {
      // Thực hiện refresh token
      const res = await axios.get("http://localhost:8090/user/refreshToken",{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
        }
      });
      // if(res.status===404){
      //   // navigate("/login")
      //   localStorage.clear("token");
      //   localStorage.clear("refreshToken");
      //   localStorage.clear("id");
      // }
      console.log(res)
      if (res.data.userDTO.token) {
        // Nếu refresh token thành công, cập nhật lại access token và thử gửi lại request gốc
        localStorage.setItem('token',res.data.userDTO.token);
        localStorage.setItem('refreshToken', res.data.userDTO.refreshToken);
        const originalRequest = error.config;
        originalRequest.headers.Authorization = 'Bearer ' + res.data.userDTO.token
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