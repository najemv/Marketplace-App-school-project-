import {useForm} from "react-hook-form";
import {useState} from "react";
import {useSetRecoilState} from "recoil";
import {loginDataAtom} from "../../../state/atom";
import {hashMessage} from "../../../utils/hash";
import axios, {AxiosError} from "axios";
import serverAddress from "../../../serverAddress";
import Info from "../Misc/Info";
import {ErrorMessage} from "@hookform/error-message";
import {User} from "../../../types";


export const Edit = (user: User) => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const setLoginData = useSetRecoilState(loginDataAtom);

  const onSubmit = async (data: any) => {

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
    <div className="grid place-items-center mt-24">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-80" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2"
                   htmlFor="email">
              Email
            </label>
            <input
              value={user.email}
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
          <div className="w-full px-3 mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nickname">
              Nickname
            </label>
            <input
              value={user.nickname}
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
          <div className="w-full px-3 mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2"
                   htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password unchanged"
              {...register("password")}
            />
            <ErrorMessage errors={errors} name="password" />
          </div>
          <div className="w-full px-3 mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2"
                   htmlFor="about">
              About
            </label>
            <input
              value={user.description}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
              id="about"
              type="text"
              placeholder="Enter something about yourself"
              {...register("about")}
            />
          </div>
          <div className="flex justify-center">
            <div>
              <button
                className="bg-imperial-red hover:bg-medium-candy-apple-red text-white font-bold py-2 px-4 rounded border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
                type="submit">
                Update
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

export default Edit;
