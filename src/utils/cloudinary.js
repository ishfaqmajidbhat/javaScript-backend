import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

// cloudinary.config({
//   cloud_name: "dahianohc",
//   api_key: 511828775355343,
//   api_secret: "TxC0wAfxTZe4nwpHyVF3o6e6XRg",
// });
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File is Uploaded on Cloudinary", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    if (error?.message) console.error("MESSAGE:", error.message);

    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
