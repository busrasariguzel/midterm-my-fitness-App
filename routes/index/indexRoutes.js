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


module.exports= router