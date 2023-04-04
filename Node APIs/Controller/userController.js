const express = require("express");
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const salt = 10;
const insertUser = async(req, res) => {
  //const {fname,lname,email,password,mobile,role}=req.body;

  const { email, password } = req.body;
  const isAUser = await User.findOne({ email: email });
    if(isAUser)
    {
        res.send(false);
    }
    else{
  const hash_password = bcrypt.hashSync(password, salt);
  const user = new User({
    email,
    hash_password,
  });
  user
    .save()
    .then((data) => {
      res.send({
        status: 200,
        message: "Data Inserted",
        result: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
};
const getAllUsers = (req, res) => {
  User.find().then((data) => {
    res.json(data);
  });
};
const getAuth = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    const isvalid = await bcrypt.compare(password, user.hash_password);
   const ssn=req.session;
   req.session.ijd=user._id,
  //  console.log(user._id.toString());
  //   console.log(req.session.ijd);
    res.send({
        auth:isvalid,
        id:req.session.ijd,
    })
  } else {
    res.send(false);
  }
};


const getUserById = async (req, res) => {
    const id = req.params.id;
    console.log("controler")
    //console.log(id);
     const user = await User.findOne({ _id: id });
    console.log(user);
     res.json(user);
  };
  const deleteUser=async(req,res)=>{
    const deleteduser = await User.deleteOne({_id:req.params.id});
    res.status(200).json(deleteduser);
  }
  const updateUser=async(req,res)=>{
    const updateduser = await User.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updateduser);
  }
  const deleteSession=(req,res)=>{
    req.session.destroy();
  }
module.exports = { insertUser, getAllUsers, getAuth,getUserById ,deleteUser,updateUser,deleteSession};
