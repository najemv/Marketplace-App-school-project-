import axios from "axios";
import apiKey from "../apiKey";


export const imageUploader = async (image: File) => {
  const formData = new FormData();
  formData.append("key", apiKey);
  formData.append('media', image);
  const apiResponse = await axios.post(`https://thumbsnap.com/api/upload`, formData);
  console.log(apiResponse.data.data.media);
  return apiResponse.data.data.media;
};