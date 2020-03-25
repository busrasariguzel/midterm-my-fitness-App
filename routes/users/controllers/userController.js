const User = require('../models/User');
const { validationResult } = require('express-validator')


const faker = require('faker');
const bcrypt= require('bcryptjs')

module.exports = {
    register: (req,res,next) => {
            const errors= validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422)
                // .json({errors:req.flash('errors')})
                .json({errors: errors.array()})
            }
            User.findOne({email:req.body.email})
    .then((user)=>{
    if(user) {
        return res.send('User exists')
        // return req.flash('errors', 'User Already Exists')

    }
    else {
    const newUser = new User();


    newUser.profile.name = req.body.name;
    newUser.profile.picture=faker.image.avatar()
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    newUser.save()
        .then((user)=> {
            req.login(user,err=> {
                if(err){
                    return res
                    .status(400)
                    .json({confirmation:false, message:err})
                } else {
                    res.redirect('/auth/bmi');
                    next();
                }
            })
        // if(user){
            
        // res.status(200).json({message:'success', user})
        // }
        }).catch(err=>{
        return next(err);
        })
    }
    })
    },
    updateProfile: (params, id) => {
        // const {name,email,address}=params;
        return new Promise((resolve, reject) => {
          User.findById(id)
            .then(user => {
              console.log('hello');
              //if(name) user.profile.name = name; if the commented code is used
              if (params.name) user.profile.name = params.name;
              if (params.email) user.email = params.email;
              if (params.address) user.address = params.address;
              return user;
            })
            .then(user => {
              user.save().then(user => {
                resolve(user);
              });
            })
            .catch(err => reject(err));
        }).catch(err => reject(err));
      },
      updatePassword: (params, id) => {
        return new Promise((resolve, reject) => {
          User.findById(id)
          .then((user)=> {
            if(!params.oldPassword && !params.newPassword && !params.repeatNewPassword) {
              reject('All password inputs must be filled');
            } else if (params.newPassword !== params.repeatNewPassword){
                reject('New password do not match')
            } else{
                bcrypt.compare(params.oldPassword,user.password)
                .then((result)=>{
                    if(result === false){
                        reject('Old Password Incorrect');
                    } else {
                        user.password = params.newPassword
                        user.save().then(user=>{
                            resolve(user);
                        })
                    }
                }).catch(err=> {
                    throw new Error(err);
                })
            }
          }).catch(err=> {
            reject(err);
          })
        })
      },
      loginGet: (req,res)=> {
        return res.render('main/login')
      },
      registerGet : (req,res)=>{
        return res.render('main/register')
      },
    //   mainGet: (req,res)=>{
    //     return res.render('main/welcome')
    //   },
      getUsers : (req,res)=>{
        User.find({})
        .then(users=>{
          return res.status(200).json({message:'success', users})
        }).catch(err=> res.status(500).json({message:'Server error'}))
      },

}
