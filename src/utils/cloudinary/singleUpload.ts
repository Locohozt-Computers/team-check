import Axios from "axios";
import { getCloudinarySignature } from "./getCloudinarySignature";

const upload_preset: any = process.env.REACT_APP_UPLOAD_PRESET;
const cloud_base_name: any = process.env.REACT_APP_CLOUDINARY_BASE_URL;
const api_key: any = process.env.REACT_APP_API_CLOUDINARY_KEY;
const api_secret: any = process.env.REACT_APP_API_CLOUDINARY_SECRET;

const timestamp = Math.round(new Date().getTime() / 1000).toString();

export const singleUpload = async (file: any) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", api_key);

    // formData.append("folder", "testing/video/path");
    formData.append("eager", "w_400,h_300,c_pad|w_260,h_200,c_crop");
    formData.append("folder", "tcp");
    formData.append("format", "webp");
    formData.append("return_delete_token", "true");
    formData.append("timestamp", timestamp);
    formData.append("upload_preset", upload_preset);

    const signature: any = getCloudinarySignature(formData, api_secret);

    formData.append("signature", signature);

    const response = await Axios.post(cloud_base_name, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data.secure_url;
  } catch (error) {
    throw error;
  }
};
