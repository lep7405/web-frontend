import OtpInput from "react-otp-input";
import { useState } from "react";
import {  RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase.config";
import Cookies from "universal-cookie";


const GetOtp = () => {
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState('');
  const cookies = new Cookies();
  cookies.set('myCat', 'Pacman', { path: '/' });
  console.log(cookies.get('myCat'));


  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          onSignup();
        },
        'expired-callback': () => {
          // Xử lý khi mã xác thực hết hạn
        }
      });
    } else {
      window.recaptchaVerifier.render().then(widgetId => {
        grecaptcha.reset(widgetId);
      });
    }
  }

  async function onSignup() {
    console.log(1)
  

  
    onCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+84"+ph;
    console.log(formatPh);

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, formatPh, appVerifier);
      window.confirmationResult = confirmationResult;
      localStorage.setItem("confirmationResult", JSON.stringify(confirmationResult));
      console.log("SMS sent successfully.");
    } catch (error) {
      console.log(error);
      window.recaptchaVerifier.render().then(function(widgetId) {
        grecaptcha.reset(widgetId);
      });
    } 
  }
  function onVerify() {
    if (!window.confirmationResult) {
      window.confirmationResult= JSON.parse(localStorage.getItem("confirmationResult"))
    }
    window.confirmationResult.confirm("635071").then( (result)=> {
      // User signed in successfully.
      const user = result.user;
      console.log(user);
    }).catch( (error)=> {
      // User couldn't sign in (bad verification code?)
      console.log(error);
    });
  }



// Sử dụng hàm getCookie để lấy giá trị của cookie có name là 'userDTO'
var userDTOString = cookies.get('userDTO')
console.log(userDTOString);
  var cookieObject = JSON.parse(atob(userDTOString));

// Truy cập các thuộc tính để lấy giá trị
var id = cookieObject.id;
var email = cookieObject.email;
var token = cookieObject.token;

// In ra các giá trị đã lấy được
console.log("ID:", id);
console.log("Email:", email);
console.log("Token:", token);
  return (
    <div>
      <div id="recaptcha-container"></div>
      <div>home</div>
      <OtpInput
        value={otp}
        otpType="number"
        onChange={setOtp}
        numInputs={6}
        autoFocus 
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
      />
      <input
        type="text"
        value={ph}
        onChange={(e) => setPh(e.target.value)}
        placeholder="Nhập số điện thoại"
      />
      <button onClick={()=>onSignup()}>Submit</button>
      <button onClick={(e)=>onVerify()}>Verify</button>
    </div>
  );
}

export default GetOtp;
