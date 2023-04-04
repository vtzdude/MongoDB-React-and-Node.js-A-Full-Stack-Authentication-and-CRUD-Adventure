const express=require('express')
const {insertUser,getAllUsers,getAuth,getUserById,deleteUser,updateUser,deleteSession}=require('../Controller/userController');
router=express.Router();
router.get('/',getAllUsers)
router.get('/:id',getUserById )
router.delete('/:id',deleteUser )
router.post('/signup',insertUser)
router.post('/login',getAuth)
router.patch('/:id',updateUser)
router.post('/',deleteSession)

module.exports=router;