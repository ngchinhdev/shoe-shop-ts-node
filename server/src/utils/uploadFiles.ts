import { Request } from 'express';
import multer from 'multer';

// Create storage for file upload
let storage = multer.diskStorage({
    destination: function (req: Request, file, cb) {
        cb(null, `./public/images/${req.baseUrl.split('/')[3]}`);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname);
    }
});

// Check file type
// function checkFileUpLoad(req: unknown, file: Express.Multer.File, cb: Function) {
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('You can only upload image files.'));
//     }
//     cb(null, true);
// }

//Upload file 
export default multer({ storage: storage });