import {BrowserRouter, Route, Routes} from "react-router-dom";
import ApplicationPage from "./Application/ApplicationPage";
import LoginPage from "./Login/LoginPage";
import RegisterPage from "./Register/RegisterPage";


export const Pages = () => {

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
