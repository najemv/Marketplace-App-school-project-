import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import serverAddress from "../../../serverAddress";
import { loginDataAtom } from "../../../state/atom";
import Info from "../Misc/Info";
import {ErrorMessage} from "@hookform/error-message";
import {useForm} from "react-hook-form";
import {useState} from "react";


export const CreateOffer = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const loginData = useRecoilValue(loginDataAtom);
  const navigate = useNavigate();

  if (!loginData.isLoggedIn) {
    return <Info message="You must be logged in to perform this action" />;
  }

  const onSubmit = async (data: any) => {
    const createdOffer = await axios.post(`${serverAddress}/offer`, data);
    navigate(`/offer/${createdOffer.data.id}`, {replace: true});
  };

  return (
    <div className="grid place-items-center mt-12">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-96" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2"
                   htmlFor="offer-title">
              Offer title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
              id="offer-title"
              type="text"
              placeholder="Enter offer title"
              {...register("title", { required: "Title is required" })}
            />
            <ErrorMessage errors={errors} name="title" />
          </div>
          <div className="w-full px-3 mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="place">
              Place
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
              id="place"
              type="text"
              placeholder="Enter place of selling"
              {...register("place", {
                required: "Place is required"
              })}
            />
            <ErrorMessage errors={errors} name="place" />
          </div>
          <div className="w-full px-3 mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2"
                   htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
              id="description"
              placeholder="Enter description"
              {...register("description")}
            />
            <ErrorMessage errors={errors} name="description" />
          </div>
          <div className="w-full px-3 mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2"
                   htmlFor="images">
              Images
            </label>
            <input
              type="file"
              className="w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
              id="images"
              {...register("images")}
            />
            <ErrorMessage errors={errors} name="images" />
          </div>
          <div className="flex justify-center">
            <div>
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

export default CreateOffer;
