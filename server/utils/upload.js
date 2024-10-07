import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import multer from 'multer';
dotenv.config();
const username = process.env.DB_USERNAME;
const password =  process.env.DB_PASSWORD;
const storage = new GridFsStorage({
    url :`mongodb+srv://vanshgupta4545:25July2003@cluster0.ymwz4v3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    options: {useNewUrlParser: true},
    file: (request, file) => {
        const match = ["image/png", "image/jpg","image/jpeg"];
        if (match.indexOf(file.memetype) === -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
           
        }
    }
})

export default multer({storage});