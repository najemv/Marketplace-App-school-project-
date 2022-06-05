import { useEffect } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginDataAtom } from "../state/atom";
import ApplicationPage from "./Application/ApplicationPage";
import LoginPage from "./Login/LoginPage";
import RegisterPage from "./Register/RegisterPage";


export const Pages = () => {
  const setLoginData = useSetRecoilState(loginDataAtom);
  // automatic login after page refresh
  useEffect(() => {
    var loginData = localStorage.getItem('loginData');
    if (loginData != null) {
      setLoginData(JSON.parse(loginData));
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
