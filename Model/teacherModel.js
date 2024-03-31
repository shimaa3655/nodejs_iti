const mongoose=require("mongoose");

// Create Schema object
const schema=new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId, 
       //auto: true // Automatically generate ObjectId
    },
    fullName:String,
    email:{
        type: String,
        unique: true
    },
    image:String,
    password: { type: String, required: true, length: {min: 8} },
    role: { type: String, enum: ['teacher', 'admin'], default: 'teacher' }
});

// ODM mapping 
module.exports=mongoose.model("teachers",schema); //new name for model

