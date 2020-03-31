const express = require('express');
const router = express.Router();
require('../../lib/passport')

router.get('/', function(req, res, next) {
    return res.render('index', { title: 'Express' });
});


router.get('/about', (req,res)=>{
    return res.render('main/about')
});

router.get('/home', (req,res)=>{
    return res.render('main/home')
});

router.get('/', (req,res)=>{
    return res.render('main/welcome')
});

router.get('/home', (req,res)=>{
    return res.render('main/home')
});

router.get('/about', (req,res)=>{
    return res.render('main/about')
});

router.get('/blog', (req,res)=>{
    return res.render('main/blog')
});

router.get('/contacts', (req,res)=>{
    return res.render('main/contacts')
})
router.get('/signup', (req,res)=>{
    return res.render('main/signup')
})

router.get('/logout', (req,res)=>{
    req.logout()
    // req.session.destroy()
    return res.redirect('/');
    })


module.exports= router