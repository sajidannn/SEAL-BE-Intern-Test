import cloudinary from 'cloudinary';
import { config } from 'dotenv';
import { nanoid } from 'nanoid';

config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploadImage = async (file, folder) => {
  try {
    const result = await cloudinary.v2.uploader.upload(file.path, {
      public_id: file.fileName || `image-${nanoid(8)}`,
      folder,
      transformation: [{ quality: 'auto' }],
    });

    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

const extractPublicId = (url) => {
  const parts = url.split('/');
  const fileName = parts.slice(-2).join('/');
  const publicId = fileName.split('.')[0];
  return publicId;
};

const deleteImageByUrl = async (url) => {
  const publicId = extractPublicId(url);
  const result = await cloudinary.v2.uploader.destroy(publicId);
  return result;
};

export {
  uploadImage,
  deleteImageByUrl,
};