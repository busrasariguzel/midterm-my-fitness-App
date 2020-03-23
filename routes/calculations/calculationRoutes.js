const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator')
const Bmi = require('./models/Bmi');
const bmiValidation = require('./bmiValidation')


router.get('/track', (req,res)=>{
    return res.render('main/track')
    })

router.get('/bmi', (req,res)=>{
        return res.render('main/bmi', {bmi:null})
})

router.post('/bmi', (req,res,next)=>{
    newBmi = new Bmi();
    newBmi.height = req.body.height;
    newBmi.weight = req.body.weight;
    newBmi.save();

const bmi = ((req.body.weight/(req.body.height*req.body.height))* 703).toFixed(2)
console.log(bmi)


return res.render('main/bmi', {bmi})
}
)


// router.get('/bmi', (req,res,next)=>{
//         Bmi.find({})
//         .then((bmi) =>{
//             bmi = (req.body.weight/(req.body.height*req.body.height))
//             console.log(bmi)
//             if(err) return next(err)
            
//             return res.render('auth/bmi', { bmi })
//         }
//         )
// })

// router.post('/bmi', )



module.exports=router;