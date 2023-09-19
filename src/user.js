const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    
    date:{
        type:Date,
        default:Date.now,
    },
    tokens:[{
        token:{
            type:String,
            required:true,

        }
    }]
});

userschema.methods.generateAuthToken=async function(){
    try{
        const token=jwt.sign({_id:this._id,email:this.email,},"SIHOUTR");
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;

    }catch(error){
        console.log("ERROR")
    }
}
module.exports=User=new mongoose.model("User",userschema);
