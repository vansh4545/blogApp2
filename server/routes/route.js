import express from 'express';


import { getImage, uploadimage } from '../controller/image_controller.js';
import upload from '../utils/upload.js';
import {signupUser,loginuser} from '../controller/user_controller.js';
import { authenticateToken } from '../controller/jwt_controller.js';
import {newComment,getComments,deleteComment} from '../controller/comment_controller.js';
import {createPost,getallPosts,getPost,updatePost,deletePost} from '../controller/post_controller.js';
const router = express.Router();
router.post('/signup',signupUser);
router.post('/login',loginuser);
router.post('/file/upload',upload.single('file'), uploadimage);
router.get('/file/:filename',getImage);

router.post('/create',authenticateToken,createPost);
router.get('/posts',authenticateToken,getallPosts);
router.get('/post/:id',authenticateToken,getPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id',authenticateToken,deletePost);

router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);
export default router;