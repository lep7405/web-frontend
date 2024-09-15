import FingerprintJS from "@fingerprintjs/fingerprintjs";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import * as Yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate=useNavigate();
  const [visitorId, setVisitorId] = useState("");
  const [combinedComponents, setCombinedComponents] = useState("");

  const [show, setShow] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [opentErrorAxios, setOpenErrorAxios] = useState(false);
  const [opentErrorAxiosText, setOpenErrorAxiosText] = useState();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Email không hợp lệ")
        .matches(/^[a-z0-9.]+@gmail\.com$/, "Email không hợp lệ")
        .required("Email là bắt buộc"),
      password: Yup.string()
        .required("Mật khẩu là bắt buộc")
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .max(24, "Mật khẩu không được vượt quá 24 ký tự")
        .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất một chữ cái viết hoa")
        .matches(/[a-z]/, "Mật khẩu phải chứa ít nhất một chữ cái viết thường")
        .matches(/[0-9]/, "Mật khẩu phải chứa ít nhất một chữ số")
        .matches(/[@$!%*?&#]/, "Mật khẩu phải chứa ít nhất một ký tự đặc biệt"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
        .required("Xác nhận mật khẩu là bắt buộc"),
      phone: Yup.string().required("SDT là bắt buộc"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      // await axios.get(
      //   `http://localhost:8090/sso/save/fingerprint/${visitorId}`
      // );
      axios
        .post("http://localhost:8090/user/Register", values)
        .then((res) => {
          console.log(res);
          navigate("/login")
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            // Nếu có phản hồi từ máy chủ, hiển thị lỗi từ máy chủ
            setOpenErrorAxios(true);

            setOpenErrorAxiosText(err.response.data.message);
            setTimeout(() => {
              setOpenErrorAxios(false);
            }, 3000);
          } else if (err.message === "Network Error") {
            setOpenErrorAxios(true);
            setOpenErrorAxiosText("server is offline");
            setTimeout(() => {
              setOpenErrorAxios(false);
            }, 3000);
            console.log("server is offline");
            // Nếu lỗi là "Network Error", hiển thị thông báo lỗi kết nối máy chủ
            toast.error(
              "🦄 Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
              {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              }
            );
          } else {
            // Xử lý các trường hợp lỗi khác
            console.error(err);
            toast.error("🦄 Có lỗi xảy ra. Vui lòng thử lại sau.", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        });
    },
  });

  // Làm một tìm hợp thư viện đặc tiên
  const getDeviceFingerprint = async () => {
    try {
      // Initialize FingerprintJS
      const fp = await FingerprintJS.load();
      const result = await fp.get();

      // Dấu vân tay thiết bị
      const { visitorId, components } = result;
      setVisitorId(visitorId);

      // Tạo chuỗi kết hợp từ các giá trị của các thành phần
      const combinedString = Object.values(components)
        .map((component) => JSON.stringify(component.value))
        .join("");
      setCombinedComponents(combinedString);
    } catch (error) {
      console.error("Error fetching fingerprint:", error);
    }
  };
  getDeviceFingerprint();
  console.log(visitorId);
  const handleGoogleSignUp = async () => {
    try {
      // Gửi fingerprint đến server
      await axios.get(
        `http://localhost:8090/sso/save/fingerprint/${visitorId}`
      );

      // Chuyển hướng đến URL đăng nhập Google
      const googleAuthUrl = "http://localhost:8090/oauth2/authorization/google";
      window.location.href = googleAuthUrl;
    } catch (error) {
      console.error("Error sending fingerprint:", error);
    }
  };

  return (
    <div className=" bg-gradient-to-r from-violet-500 to-fuchsia-500 flex justify-center items-center  w-full h-screen">
      <div className="flex flex-col items-center bg-slate-200 w-1/3 min-w-[500px] h-3/4 rounded-3xl border-double border-8 border-indigo-600 mb-16">
        <h1 className="text-3xl font-bold text-black">Register</h1>
        <form
          className="w-full flex flex-col items-center  gap-y-5 mt-5"
          onSubmit={formik.handleSubmit}
        >
          <div className="w-[80%]  flex flex-col justify-center">
            <input
              placeholder="Email"
              id="email"
              name="email"
              value={formik.email}
              onChange={formik.handleChange}
              className="w-full max-w-[100%] p-3 rounded-lg bg-gray-300"
            />
            {formik.errors && formik.errors.email && (
              <div className="text-red-500">{formik.errors.email}</div>
            )}
          </div>
          <div className="w-[80%] flex flex-col justify-center">
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                id="password"
                name="password"
                value={formik.password}
                onChange={formik.handleChange}
                className="w-full max-w-[100%] p-3 rounded-lg bg-gray-300"
              />
              <VisibilityIcon
                className="absolute right-1 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
                type="button"
                onClick={() => setShow(!show)}
              />
            </div>
            {formik.errors && formik.errors.password && (
              <div className="text-red-500">{formik.errors.password}</div>
            )}
          </div>
          <div className="w-[80%]  flex flex-col justify-center">
            <div className="relative">
              <input
               type={showConfirmPass ? "text" : "password"}
              
                placeholder="ConfirmPassword"
                id="confirmPassword"
                name="confirmPassword"
                value={formik.confirmPassword}
                onChange={formik.handleChange}
                className="w-full max-w-[100%] p-3 rounded-lg bg-gray-300"
              />
              <VisibilityIcon
                className="absolute right-1 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              />
            </div>
            {formik.errors && formik.errors.confirmPassword && (
              <div className="text-red-500">
                {formik.errors.confirmPassword}
              </div>
            )}
          </div>
          <div className="w-[80%] flex flex-col justify-center">
            <input
              placeholder="Phone"
              id="phone"
              name="phone"
              value={formik.phone}
              onChange={formik.handleChange}
              className="w-full max-w-[100%] p-3 rounded-lg bg-gray-300"
            />

            {formik.errors && formik.errors.phone && (
              <div className="text-red-500">{formik.errors.phone}</div>
            )}
          </div>

          <button
            className="w-full max-w-[80%] p-3 rounded-lg bg-black hover:bg-violet-800 text-white transition duration-300 ease-in-out"
            type="submit"
          >
            Register
          </button>
          {opentErrorAxios && (
            <div>
              <p className="text-red-500 text-xl">** {opentErrorAxiosText}</p>
            </div>
          )}
        </form>
        <button
          className="w-full max-w-[80%] p-3 rounded-lg bg-black hover:bg-violet-800 text-white transition duration-300 ease-in-out mt-3"
          type="button"
          onClick={() => handleGoogleSignUp()}
        >
          Sign up Google
        </button>{" "}
        <div id="fingerprintResult"></div>
      </div>
    </div>
  );
};

export default Register;
