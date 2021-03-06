const express = require('express');
const router = express.Router();
const userValidation = require('./userValidation');
const User = require('./models/User');
const passport=require('passport');
const userController =require('./controllers/userController')
const {register,
        loginGet,
        registerGet,
        mainGet,
        getUsers
      } = require('./controllers/userController')
require('../../lib/passport')
// const userController = require('./controllers/userController')

// router.get('/', mainGet);

router.get('/login', loginGet);

router.post('/login', 
  passport.authenticate('local-login',{
  successRedirect: '/home',
  failureRedirect:'/users/login',
  failureFlash:true
}))

router.get('/register', registerGet);

router.get('/getUsers', getUsers);


router.post('/register', userValidation, register);


router.put('/update-profile', (req,res)=>{
  userController.updateProfile(req.body,req.user._id)
  .then((user)=> {
    return res.redirect('/users/profile')
  }).catch((err)=> {
    console.log(err)
    return res.redirect('/users/update-profile')
  })
  });

router.get('/update-profile', (req,res)=>{
    if(req.isAuthenticated()){
    return res.render('main/updateProfile')
    }
    return res.redirect('/')
});

router.put('/update-password',(req,res)=>{
    userController.updatePassword(req.body, req.user._id)
    .then((user)=>{
      return res.redirect('/users/profile');
    }).catch(err=>{
      return res.redirect('/users/update-profile')
    });
});

// router.get('/profile', (req,res)=>{
//   return res.render('main/profile')
// })

router.get('/profile', (req,res,next)=> {
  if(req.isAuthenticated){
    return res.render('main/profile')
  } else{
    return res.send('Unauthorized')
  }
})

module.exports = router;
