import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import serverAddress from "../../../serverAddress";
import { loginDataAtom } from "../../../state/atom";
import Info from "../Misc/Info";
import {ErrorMessage} from "@hookform/error-message";
import {useForm} from "react-hook-form";
import {useState} from "react";
import ImageChooser from "./ImageChooser";
import CategoryChooser from "./CategoryChooser";
import { imageUploader } from "../../../utils/imageUploader";


const generateImageChoosers = (count: number, register: Function) => {
  let result: any = [];
  for (let i = 1; i <= count; i++) {
    result.push(<ImageChooser key={i} order={i} register={register}/>);
  }
  return result;
};

const generateCategoryChoosers = (count: number, register: Function) => {
  let result: any = [];
  for (let i = 1; i <= count; i++) {
    result.push(<CategoryChooser key={i} order={i} register={register}/>);
  }
  return result;
};

const getImages = async (data: any) => {
  let i = 1;
  const images: any[] = [];
  while (true) {
    const file = data[`image${i}`];
    const description = data[`image${i}Description`];
    if (file === undefined || file[0] === undefined || description ===undefined) {
      break;
    }

    const profilePictureLink = await imageUploader(file[0]);

    let a: [number, number] = [2, 3];
    images.push({
      path: profilePictureLink,
      description: description
    });
    i++;
  }

  return images;
};

const getCategories = (data: any) => {
  let i = 1;
  const categories: number[] = [];
  while (true) {
    const category = data[`category${i}`]
    console.log(category)
    if (category === undefined) {
      break;
    }
    categories.push(Number(category));
    i++;
  }

  return categories;
};


export const CreateOffer = () => {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const loginData = useRecoilValue(loginDataAtom);
  const [photosCount, setPhotosCount] = useState(1);
  const [categoriesCount, setCategoriesCount] = useState(1);
  const navigate = useNavigate();

  if (!loginData.isLoggedIn) {
    return <Info message="You must be logged in to perform this action" />;
  }

  const onSubmit = async (data: any) => {
    console.log(data);
    
    try {
      const images = await getImages(data);
      const categories = getCategories(data);

      const req = {
        title: data.title,
        description: data.description,
        price: data.price,
        place: data.place,
        authorNickname: loginData.nickname,
        categories: categories,
        photos: images
      }
      console.log(req);

      const createdOffer = await axios.post(`${serverAddress}/offer`, req);
      console.log(createdOffer);
      navigate(`/offer/${createdOffer.data.data.id}-${createdOffer.data.data.title.toLowerCase()}`, {replace: true});
    } catch (err) {
      const e = err as AxiosError;
      if (e.response) {
        console.log(e.response.data)
      }
    }
  };

  const imageChoosers = generateImageChoosers(photosCount, register);
  const categoryChoosers = generateCategoryChoosers(categoriesCount, register);

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
          <div className="flex">
            <div className="flex-1 w-45 px-3 mb-6">
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
            <div className="flex-1 px-3 mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price">
                Price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
                id="price"
                type="number"
                min={0}
                {...register("price", {
                  required: "Price is required"
                })}
              />
              <ErrorMessage errors={errors} name="price" />
            </div>        
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
            <span className="block text-gray-700 text-sm font-bold mb-2">Categories:</span>
            {
              categoryChoosers
            }
            
            <button
              className="bg-imperial-red hover:bg-medium-candy-apple-red text-white font-bold py-2 px-4 rounded border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
              type="button"
              onClick={() => setCategoriesCount(c => c + 1)}
            >
              +
            </button>
          </div>
          <div className="w-full px-3 mb-6">
            <span className="block text-gray-700 text-sm font-bold mb-2">Images:</span>
            {
              imageChoosers
            }
            <button
              className="bg-imperial-red hover:bg-medium-candy-apple-red text-white font-bold py-2 px-4 rounded border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
              type="button"
              onClick={() => setPhotosCount(c => c + 1)}
            >
              +
            </button>

          </div>
          <div className="flex justify-center">
            <div>
              <button
                className="bg-imperial-red hover:bg-medium-candy-apple-red text-white font-bold py-2 px-4 rounded border-space-cadet focus:border-space-cadet focus:ring-0 focus:shadow-outline"
                type="submit">
                Create
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
