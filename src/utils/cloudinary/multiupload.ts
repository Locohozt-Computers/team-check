import Axios from "axios";
import { CatchErrors } from "../CatchErrors";
import { getCloudinarySignature } from "./getCloudinarySignature";

const upload_preset: any = process.env.REACT_APP_UPLOAD_PRESET;
const cloud_base_name: any = process.env.REACT_APP_CLOUDINARY_BASE_URL;
const api_key: any = process.env.REACT_APP_API_CLOUDINARY_KEY;
const api_secret: any = process.env.REACT_APP_API_CLOUDINARY_SECRET;

const timestamp = Math.round(new Date().getTime() / 1000).toString();

export const multiUploadImage = async (files: any) => {
  try {
    const uploaders = await [...files]?.map(async (file) => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", api_key);

      formData.append("eager", "w_400,h_300,c_pad|w_260,h_200,c_crop");
      formData.append("folder", "tcp");
      formData.append("format", "webp");
      formData.append("return_delete_token", "true");
      formData.append("timestamp", timestamp);
      formData.append("upload_preset", upload_preset);
      // formData.append("public_id", "sample_image");

      const signature: any = getCloudinarySignature(formData, api_secret);

      formData.append("signature", signature);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      const res = await Axios.post(cloud_base_name, formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });

      const width = res?.data?.width;
      const height = res?.data?.height;
      const orientation = height > width ? "portrait" : "landscape";

      // setSize({
      //   width: res?.data?.width,
      //   height: res?.data?.height,
      // });
      return res?.data?.secure_url
      // return {
      //   id: timestamp,
      //   height,
      //   width,
      //   orientation,
      //   url: res.data.secure_url,
      // };
    });

    return await Promise.all(uploaders);
  } catch (error) {
    CatchErrors(error);
  }
};
