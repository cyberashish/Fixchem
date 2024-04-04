const userData = require("../model/contact");
const User = userData.UserModel;

exports.createContact = async (req,res) => {
    try{
        const user = new User(req.body);
        const doc = await user.save(user);
        res.status(201).json(doc);
        
    }catch(error){
        res.status(400).json(error);
        console.log(error)
    }
};

exports.getContacts = async (req,res) => {
    try{
        const docs = await User.find({});
        res.status(200).json(docs);
    }catch(error){
        res.status(400).json(error);
    }
}