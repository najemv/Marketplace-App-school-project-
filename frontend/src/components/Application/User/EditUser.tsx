import {useForm} from "react-hook-form";
import {useState} from "react";
import {useRecoilState, useSetRecoilState} from "recoil";
import {loginDataAtom} from "../../../state/atom";
import {hashMessage} from "../../../utils/hash";
import axios, {AxiosError} from "axios";
import serverAddress from "../../../serverAddress";
import Info from "../Misc/Info";
import {ErrorMessage} from "@hookform/error-message";
import {User} from "../../../types";
import { useNavigate } from "react-router-dom";
import { imageUploader } from "../../../utils/imageUploader";

export const Edit = (user: User) => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const [loginData, setLoginData] = useRecoilState(loginDataAtom);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      
      let profilePicture: string | undefined = undefined;
      if (data.profilePicture.length > 0) {
        profilePicture = await imageUploader(data.profilePicture[0]);
      }
      
      const password = (data.password) ? await hashMessage(data.password) : loginData.password;
      const req = {
        // TODO
        profilePicture: profilePicture,
        description: data.description,
        email: data.email,
        password: password,
      }
      console.log(req);
      const res = await axios.put(`${serverAddress}/user/${user.nickname}`,req);
      setLoginData({
        isLoggedIn: true,
        nickname: loginData.nickname,
        password: password
      });
      navigate(`/user/${user.nickname}`);
    } catch (err) {
      const e = err as AxiosError;
      if (e.response) {
        console.log(e.response.data)
        setErrorMsg(e.response.data.message);
      }
    }
  };

  const validateEmail = async (email: string) => {
    if (email == user.email) {
      return true;
    }

    try {
      const res = await axios.post(`${serverAddress}/user/check`, {email});
      return res.data.data.exists === false || "Email is taken";
    } catch (err) {
      const e = err as AxiosError;
      if (e.response) {
        setErrorMsg(e.response.data.message);
      }
    }
  };



  if (confirmation) {
    return <Info message="Your accout was successfully created" />;
  }

  return (
    <div className="grid place-items-center mt-16">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-96" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2"
                   htmlFor="email">
              Email
            </label>
            <input
              defaultValue={user.email}
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
            <textarea
              defaultValue={user.description}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
              id="about"
              placeholder="Enter something about yourself"
              {...register("description")}
            />
          </div>
          <div className="w-full px-3 mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2"
                   htmlFor="profilePicture">
              Profile picture
            </label>
            <input
              type="file"
              className="w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
              id="profilePicture"
              {...register("profilePicture")}
            />
            <ErrorMessage errors={errors} name="profilePicture" />
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
