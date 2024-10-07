import mongoose from 'mongoose'

const userschema = mongoose.Schema({
    name:{
        type:String,
        required:true
        
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const user = mongoose.model('user',userschema);

export default user;