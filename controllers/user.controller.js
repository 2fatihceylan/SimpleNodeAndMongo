const { default: mongoose } = require('mongoose');
const User = require('../models/user.model');



const getUsers = async (req, res) =>{

    try{
        const users = await User.find({});

        res.status(200).json({success: true, data: users});
    }
    catch(error){
        console.log(error);

        res.status(500).json({success: false, message: "Server Error"});
    }
}



const getUserById = async (req, res)=>{

    const {id} = req.params;

    try{
        const user = await User.findById(id);

        res.status(200).json({success: true, data: user});
    }
    catch(error){
        console.log(error);
        res.status(404).json({success: false, message: "User not found"});
    }
}




const createUser = async (req, res)=>{

    const user = req.body;


    if(!user.name || !user.lastname || !user.address || !user.age ){
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    const newUser = new User(user);


    try{
        await newUser.save();

        res.status(201).json({success: true, data: newUser});
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: "Server Error"});
    }


}



const updateUser = async (req, res) =>{

    const {id} = req.params;

    const user = req.body;


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid user id"});
    }



    try{
        const updatedUser = await User.findByIdAndUpdate(id, user, {new: true});

        res.status(200).json({success: true, data: updatedUser});
    }
    catch(error){
        console.log(error);

        res.status(404).json({success: false, message: "user not found"});
    }


}




const deleteUser = async (req, res)=>{

    const {id} = req.params;


    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid user id"});
    }


    try{
        await User.findByIdAndDelete(id);

        res.status(200).json({success: true, message: "User deleted"});
    }
    catch(error){
        console.log(error);

        res.status(404).json({success: false, message: "user not found"});
    }
    
}








module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}