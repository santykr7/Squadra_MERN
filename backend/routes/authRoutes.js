const express = require('express');
const router = express.Router();
const { test,registerUser,loginUser,getProfile,getAllData,updateData, deleteUser, getOneProfile} = require('../controller/authControllers');

// Set up the test route
router.get('/', test);

router.post('/register',registerUser)

router.post('/login',loginUser)
router.get('/profile',getProfile)
router.get('/getOne/:id',getOneProfile)
router.get('/getAll',getAllData)
router.put('/update/:id',updateData)
router.delete('/delete/:id',deleteUser)

module.exports = router;