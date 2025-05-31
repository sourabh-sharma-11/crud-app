// const User = require('../models/usermodels')

// // create api

// const create = async (req, res) => {
//     try {

//         const userData = new User(req.body);
//         if (!userData) {
//             return res.status(404).json({ msg: "User Data is not found" })
//         }
//         const savedData = await userData.save();
//         res.status(201).json(savedData)
//     } catch (error) {
//         res.status(500).json({ error: error });
//     }
// }
const { hashPassword } = require('../helper/auth.helper');
const User = require('../models/usermodels');

// create api
const create = async (req, res) => {
    try {
        const { fname, lname, email, password } = req.body;

        if (!fname || !lname || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const hashedPassword = await hashPassword(password);
        const userData = new User({ fname, lname, email, password: hashedPassword });

        const savedData = await userData.save();
        res.status(201).json(savedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


//fetch all data
const getAll = async (req, res) => {
    try {
        const userData = await User.find();
        if (!userData) {
            return res.status(404).json({ msg: "User Data is not found" })
        }
        res.status(200).json(userData)

    } catch (error) {
        res.status(500).json({ error: error });
    }
}
// fetch data by id
const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: " user is not found" })
        }
        res.status(200).json(userExist);

    } catch (error) {
        res.status(500).json({ error: error });
    }
}
//update data

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg:" user is not found"})
        }
        const updatedData = await User.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json({msg : "user updated succesfully"});
    } catch (error) {
        res.status(500).json({ error: error });
    }

}
// delete data
const deletUser = async (req,res) =>{
    try{
        const id  = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg:"user is not exist"})
        }
        await User.findByIdAndDelete(id);
       res.status(200).json({msg:"User deleted successfully"});
    }catch(error){
        res.status(500).json({ error: error });
    }
}
module.exports = {
    create,
    getAll, getOne, update , deletUser
}