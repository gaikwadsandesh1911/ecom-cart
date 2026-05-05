/* import multer from 'multer';

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb)=>{
        // console.log('file', file)
        if(file.mimetype.startsWith('image/')){
            return cb(null, `${Date.now()}-${file.originalname}`);
        }
        else{
            cb(new Error("Only image file is allowed"));
        }
    }
});

export const upload = multer({storage: storage}); */

import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'products',       // folder name in your cloudinary account
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    }
});

export const upload = multer({ storage });