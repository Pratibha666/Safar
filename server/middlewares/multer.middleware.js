import multer from 'multer';
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary.js';
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Safar-photos',
    format: async (req, file) => 'png', 
    public_id: (req, file) => file.originalname+'-'+Date.now(),
  },
});
const upload=multer({storage:storage})
export default upload
