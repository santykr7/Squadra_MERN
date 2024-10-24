const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {hashPassword, comparePassword} = require('../helpers/auth')

const test = (req, res) => {
    res.json('test is working');
};

//register endpoints
const registerUser = async(req,res) => {
  try {
    const{name,email,password,phone_number,profession} = req.body
    if(!name){
      return res.json({
        error:'name is required'
      })
    }
    //check if password is good
    if(!password || password.length <=8){
      return res.json({
        error: 'Password should be minimum 8 character length'
      })
    }
    //check email
    const exist = await User.findOne({email})
    if(exist){
      return res.json({
        error: 'Email is already taken'
      })
    }

    const hashedPassword = await hashPassword(password)
    //create user in database
    const user = await User.create({
      name,email,password:hashedPassword,phone_number,profession
    })
    return res.json(user)
  } catch (error) {
    console.log(error)
  }
}

//login endpoint
const loginUser = async(req, res) => {
  try {
    const {email,password} = req.body

    // check if user exist
    const user = await User.findOne({email})
    if(!user){
      return res.json({
        error:'No user found'
      })
    }
    //check if password match
    const match = await comparePassword(password,user.password)
    if(match) {
      jwt.sign({email:user.email, id:user._id, name:user.name},process.env.JWT_SECRET,{},(err, token) => {
        if(err) throw err;
        res.cookie('token',token).json(user)
      })
    }
    if(!match){
      res.json({
        error:'Password do not match'
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const getProfile = async(req, res) => {
  try {
    const {token} = req.cookies
    if(token){
      jwt.verify(token,process.env.JWT_SECRET,{},(err,user) => {
        if(err) throw err
        res.json(user)
      })
    }else{
      res.json(null)
    }
  } catch (error) {
    
  }
}

const getOneProfile = async(req,res) => {
  try {
    const id = req.params.id
    const userExist = await User.findById(id)
    if(!userExist){
      res.json({
        error:'User not found'
      })
    }else{
      res.json(userExist)
    }
  } catch (error) {
    
  }
}

const getAllData = async (req, res) => {
  try {
    const userData = await User.find();
    if (userData && userData.length > 0) {
      res.status(200).json(userData);
    } else {
      res.status(404).json({ error: 'No users found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateData = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findById(id);
    
    if (!userExist) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updatedData = await User.findByIdAndUpdate(id, req.body, { new: true });
    
    res.status(200).json(updatedData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};


const deleteUser = async(req,res) => {
  try {
    const id = req.params.id
    const userExist = await User.findById(id)
    if(!userExist){
      res.json({
        error:'User not found'
      })
    }
    await User.findByIdAndDelete(id)
    res.json({msg:'user delete successfully'})
  } catch (error) {
    console.log(error)
  }
}
  
module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    getAllData,
    updateData,
    deleteUser,
    getOneProfile
};