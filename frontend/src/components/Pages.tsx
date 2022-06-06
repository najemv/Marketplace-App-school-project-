import axios from "axios";
import { useEffect } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { useSetRecoilState } from "recoil";
import serverAddress from "../serverAddress";
import { loginDataAtom } from "../state/atom";
import ApplicationPage from "./Application/ApplicationPage";
import LoginPage from "./Login/LoginPage";
import RegisterPage from "./Register/RegisterPage";


export const Pages = () => {
  const setLoginData = useSetRecoilState(loginDataAtom);
  // automatic login after page refresh
  useEffect(() => {
    var loginDataString = localStorage.getItem('loginData');
    if (loginDataString != null) {
      const loginData = JSON.parse(loginDataString);
      
      axios.post(`${serverAddress}/user/check`, {nickname: loginData.nickname})
        .then((res) => {
          if (res.data.data.exists) {
            setLoginData(loginData);
          }
        })
        .catch();
    }
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path='/*' element={<ApplicationPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
