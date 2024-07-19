import { Route, Routes } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./common/Header";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import "./App.css";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
