const mongoose  = require("mongoose");

const {Schema} = mongoose;

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    message:Schema.Types.Mixed,
    phone:{type:Number},
    subject:{type:String,required:true},
});

exports.UserModel = mongoose.model("user",userSchema);