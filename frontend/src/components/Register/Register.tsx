import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import axios, { AxiosError } from "axios";
import serverAddress from "../../serverAddress";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginDataAtom } from "../../state/atom";
import { hashMessage } from "../../utils/hash";
import Info from "../Application/Misc/Info";


export const Register = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const setLoginData = useSetRecoilState(loginDataAtom);
  const onSubmit = async (data: any) => {
    try {
      const hashedPassword = await hashMessage(data.password);
      const res = await axios.post(`${serverAddress}/register`, {
        nickname: data.nickname,
        email: data.email,
        password: hashedPassword
      });

      setConfirmation(true);
      setLoginData({
        isLoggedIn: true,
        nickname: data.nickname,
        password: hashedPassword
      });
    }
    catch (err) {
      const e = err as AxiosError;
      if (e.response) {
        setErrorMsg(e.response.data.message);
      }
    }
  };

  const validateEmail = async (email: string) => {
    try {
      const res = await axios.post(`${serverAddress}/user/check`, {email});
      return res.data.data.exists === false || "Email is taken";
    } catch (err) {
      const e = err as AxiosError;
        if (e.response) {
          setErrorMsg(e.message);
        }
    }
  };

  const validateNickname = async (nickname: string) => {
    try {
      const res = await axios.post(`${serverAddress}/user/check`, {nickname});
      return res.data.data.exists == false || "Nickname is taken";
    } catch (err) {
      const e = err as AxiosError;
        if (e.response) {
          setErrorMsg(e.message);
        }
    }
    return "Error";
  };

  
  if (confirmation) {
    return <Info message="Your accout was successfully created" />;
  }

  return (
    <div className="grid place-items-center h-5/6">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2"
                   htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
              id="grid-first-name"
              type="text"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                },
                validate: validateEmail
              })}
            />
            <ErrorMessage errors={errors} name="email" />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nickname">
              Nickname
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
              id="nickname"
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
                },
                validate: validateNickname
              })}
            />
            <ErrorMessage errors={errors} name="nickname" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-4/6 px-3 mb-6 md:mb-0">
            <label className="block text-gray-700 text-sm font-bold mb-2"
                   htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
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
          </div>
          <div className="flex flex-wrap mt-7 ml-0 md:ml-12">
            <div className="w-full md:w-1/2 px-3">
              <button
                className="bg-imperial-red hover:bg-medium-candy-apple-red text-white font-bold py-2 px-4 rounded border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
                type="submit">
                Register
              </button>
            </div>
          </div>
        </div>
        {errorMsg &&
          <span className="text-red-600">{errorMsg}</span>
        }
      </form>
    </div>
  );
};

export default Register;
