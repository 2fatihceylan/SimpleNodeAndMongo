const express = require('express');

const router = express.Router();

const {getUsers, getUserById, createUser, updateUser, deleteUser} = require('../controllers/user.controller');


router.get("/getAllUsers", getUsers);

router.get("/getUserById/:id", getUserById);

router.post("/createUser", createUser);

router.put("/updateUser/:id", updateUser);

router.delete("/deleteUser/:id", deleteUser);



module.exports = router;