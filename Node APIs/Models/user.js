const mongoose=require('mongoose');
const schema=mongoose.Schema;
const blog=new schema({
    email:{type:String,require:true,min:3,max:20},
    hash_password:{type:String,require:true,min:3,max:20},
    fname:{type:String,default:""},
    lname:{type:String,default:""},
    mobile:{type:String,default:"",min:10,max:10},
    

})
const user=mongoose.model("User",blog);
module.exports=user
