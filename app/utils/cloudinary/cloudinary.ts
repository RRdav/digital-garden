import { v2 as cloudinary } from 'cloudinary';

// Safeguard the setup
if (!process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Missing Cloudinary API Secret in environment variables");
}

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;