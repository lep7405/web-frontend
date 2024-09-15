import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./common/Header";
import Home from "./page/Home/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import "./App.css";
import SearchProduct from "./page/SearchProduct/SearchProduct";
import DetailProduct from "./page/DetailProduct/DetailProduct";
import Cart from "./page/Cart/Cart";
import ConfirmCart from "./page/ConfirmCart/ConfirmCart";
import { useSelector } from "react-redux";
import { selectIslogin } from "./Redux/AuthSlice";
import { useEffect } from "react";
import Profile from "./page/Profile/Profile";
import MyProfile from "./page/Profile/MyProfile";
import AddressBook from "./page/Profile/Address/AddressBook";
import { SearchResult } from "./page/Search/SearchResult";
import CreatePayment from "./page/Payment/CreatePayment";
import SuccessPayment from "./page/Payment/SuccessPayment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentCallbackListener from "./helper/PaymentCallbackListener";
import Order from "./page/Profile/Order/Order";
import LogOutOther from "./page/Profile/LogOutOther";
import OrderDetail from "./page/Profile/Order/OrderDetail";
import Reviews from "./page/Profile/Reviews/Reviews";
function App() {
  const navigate = useNavigate();
  const isLogin = useSelector(selectIslogin);
  useEffect(() => {
    if (!localStorage.getItem("userDTO") && !localStorage.getItem("id")) {
      navigate("/login");
    }
  }, [isLogin]);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PaymentCallbackListener />
      <main className="flex-grow bg-gray-200">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/searchProduct" element={<SearchProduct />} />
          <Route path="/product/:id" element={<DetailProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/confirmCart" element={<ConfirmCart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/myProfile" element={<MyProfile />} />
          <Route path="/profile/addressBook" element={<AddressBook />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/payment/createPayment" element={<CreatePayment />} />
          <Route path="/payment/successPayment" element={<SuccessPayment />} />
          <Route path="/order" element={<Order />} />
          <Route path="/orderDetail/:order1Id/:productId" element={<OrderDetail />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/logoutOther" element={<LogOutOther />} />
        </Routes>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;
