import Header from "../Application/Header/Header";
import Login from "./Login";


export const LoginPage = () => {

  return (
    <div className="flex-col h-screen">
      <Header/>
      <Login/>
    </div>
  );
};

export default LoginPage;
