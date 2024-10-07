import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import token from '../model/token.js';
import User from '../model/user.js'

dotenv.config();

export const signupUser =async(request,response)=>{
    try{
          const salt = await bcrypt.genSalt();
          const hashp = await bcrypt.hash(request.body.password,salt);

         const user = {username:request.body.username,password:hashp,name:request.body.name};
         console.log(user);
         if(user.username.trim().length === 0){
          return response.status(500).json({typeOferror:0,msg: "username is required"});
         }
         if(user.name.trim().length === 0){
          return response.status(500).json({typeOferror:1,msg: "name is required"});
         }
     const existingUser = await User.findOne({ username:user.username });
     if (existingUser) {
         return response.status(401).send({
             success: false,
             msg: "User already exists",
             typeOferror:"Already exists"
         })
     }

         const newUser= new User(user);
         await newUser.save();
          
         return response.status(200).json({msg: "signup successful"})
    }
    catch(error){
          console.log(error);
         return response.status(500).json({msg:"signup unsuccessful"})
         
    }
}

export const loginuser =async(request,response)=>{
    let user = await User.findOne({username:request.body.username});
    if(!user){
        return response.status(400).json({msg:"User not found"});
    }
    try{
        let match = await bcrypt.compare(request.body.password,user.password);
        if(match){
            const accesstoken = jwt.sign(user.toJSON(),process.env.A_S_K,{expiresIn:'60m'});
            const refreshtoken = jwt.sign(user.toJSON(),process.env.R_S_K);

            const  newtoken = new token({token:refreshtoken});
            await newtoken.save();
            return response.status(200).json({accesstoken:accesstoken,refreshtoken:refreshtoken,name:user.name,username:user.username});
        }
        else{
           
            return response.status(400).json({msg:"password is incorrect"});
        }
    }
    catch(error){
        console.log(error);
        return response.status(500).json({msg:"login unsuccessful"})
    }
}
