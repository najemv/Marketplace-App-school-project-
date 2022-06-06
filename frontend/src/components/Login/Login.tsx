import { ErrorMessage } from "@hookform/error-message";
import axios, {AxiosError} from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import serverAddress from "../../serverAddress";
import { loginDataAtom } from "../../state/atom";
import { hashMessage } from "../../utils/hash";

export const Login = () => {
  const { register, handleSubmit, reset, formState: {errors} } = useForm();
  const setLoginData = useSetRecoilState(loginDataAtom);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const hashedPassword = await hashMessage(data.password);
    try {
      const res = await axios.post(`${serverAddress}/login`, {
        nickname: data.nickname,
        password: hashedPassword
      });
      const loginData = {
        isLoggedIn: true,
        nickname: data.nickname,
        password: hashedPassword
      };
      setLoginData(loginData);
      setErrorMsg("");
      localStorage.setItem('loginData', JSON.stringify(loginData));
      navigate("/", {replace: true});
      
    } catch (err) {
      const e = err as AxiosError;
      if (e.response) {
        setErrorMsg(e.response.data.message);
      }
      if (err instanceof Error){
        console.log(err.message);
      }
    }
  };

  return (
    <div className="grid place-items-center h-5/6" onSubmit={handleSubmit(onSubmit)}>
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Nickname
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter nickname"
            {...register("nickname", {
              required: "Nickname is required",
                minLength: {
                  value: 2,
                  message: "Must be between 2 and 32 characters"
                },
                maxLength: {
                  value: 32,
                  message: "Must be between 2 and 32 characters"
                },
                pattern: {
                  value: /^[A-Z0-9._-]+$/i,
                  message: "Only characters, digits, and . _ - are allowed"
                }
            })}
          />
          <ErrorMessage errors={errors} name="nickname" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Invalid password; atleast 8 charackers are required"
              }
            })}
          />
          <ErrorMessage errors={errors} name="password" />
        {errorMsg &&
          <span className="text-red-600">{errorMsg}</span>
        }
        </div>

        <div className="flex items-center justify-center">
          <button
            className="bg-imperial-red hover:bg-medium-candy-apple-red text-white font-bold py-2 px-4 rounded border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
            type="submit">
            Sign In
          </button>
        </div>

      </form>
    </div>
  );
};

export default Login;
