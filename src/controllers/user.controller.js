UserCtrl = {}

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Record, Document } = require('../models');


// create a new user
UserCtrl.create = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const { Name, Email, Password, Department } = req.body;
    const newUser = await User.create({
        Name,
        Department,
        Email,
        Password: await bcrypt.hash(Password, salt),
    });
    res.json({message:"User created"});
}

// get all users
UserCtrl.getAll = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
}

// login a user
UserCtrl.login = async (req, res) => {
    const { Email, Password } = req.body;
    const user = await User.findOne({ where : {Email : Email }});
    if(user){
       const password_valid = await bcrypt.compare(Password,user.Password);
       if(password_valid){
           token = jwt.sign({ "id" : user.id,"Email" : user.Email, Name: user.Name, "Department": user.Department },process.env.SECRET);
           res.status(200).json({ token : token });
       } else {
         res.status(400).json({ error : "Password Incorrect" });
       }
     
     }else{
       res.status(404).json({ error : "User does not exist" });
     }
     
}

// get a user by id
UserCtrl.getById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id, {
        attributes: ['Name', 'Email', 'Department'],
        include: [
            {
                model: Record,
                as: 'records',
                attributes: ['createdAt'],
                include: [
                    {
                        model: Document,
                        as: 'document',
                        attributes: ['Number', 'Name', 'Plate']
                    }
                ]
            }
        ]
    });
    res.json(user);
}

// update a user
UserCtrl.update = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await User.findByPk(id);
    await user.update({
        name,
        email,
        password
    });
    res.json(user);
}

// delete a user
UserCtrl.delete = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    await user.destroy();
    res.json(user);
}

module.exports = UserCtrl;