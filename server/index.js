import express from "express";
import dotenv from 'dotenv';

import cors from 'cors';
import bodyParser from "body-parser";
import Connection from "./database/db.js";
import Router from "./routes/route.js";

dotenv.config();
const app =express();
app.use(bodyParser.json({extended:true}))

app.use(cors());
app.use(bodyParser.json({extended:true}))  
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',Router);

// if(process.env.NODE_ENV === 'production'){

// }
const PORT = process.env.PORT || 8000;
//const PORT = 8000;
app.listen(PORT, ()=> console.log(`Server is successfully running on pt ${PORT}`));
const USERNAME = process.env.DB_USERNAME;
const PASSWORD= process.env.DB_PASSWORD;


Connection();
