// Login.js
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
import useStateLogin from '../../store/LoginStore/login_store';
import { ButtonBorder } from '../../component/UI';
import React from 'react';
export const Login=()=>{
  const {login,logout,setIsSuccess,setShow} = useStateLogin()
const handleLoginSuccess = async (credentialResponse) => {
  const googleToken = credentialResponse.credential;

  try {
    const response = await fetch('http://localhost:5000/api/auths/loginGoogle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: googleToken }),
    });
    if (!response.ok) {
      setIsSuccess(false)
      const errorText = await response.text(); 
      console.error('Lỗi từ backend:', errorText);
      return;
    }

    const data = await response.json();

    if (data.token) {
      setIsSuccess(true)
      setShow(false)
      const decode: { exp?: number } = jwtDecode(data.token);
      if (decode.exp !== undefined) {
        login(data.refreshToken, String(decode.exp * 1000), data.token);
      } else {
        console.error('❌ Không tìm thấy exp trong token đã giải mã.');
        setIsSuccess(false);
      }
    } else {
      console.log('❌ Đăng nhập thất bại:', data.message || data);
    }
  } catch (err) {
    console.error('❌ Lỗi xử lý đăng nhập:', err);
  }
};

  const handleLoginError = () => {
    console.log('Đăng nhập Google thất bại');
  };
  return (
    <div className='p-3'>
      {/* <GoogleLogin
      onSuccess={credentialResponse => {
        handleLoginSuccess(credentialResponse)
      }}
      onError={() => {
        handleLoginError()
      }}
    /> */}
      <ButtonBorder className='' onClick={()=>{}}>
          <p></p>
      </ButtonBorder>
    </div>
  
  );
}