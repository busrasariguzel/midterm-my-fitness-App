const router = require('express').Router();
const Calories = require('./models/Calories');



router.get('/', (req,res)=>{
    // Calories.find({}).then(calories =>{
        return res.render('main/calories' , {calories:null})
    // })
})

router.post('/', (req,res,next)=>{

const newCalories = new Calories();
newCalories.breakfast = req.body.breakfast;
newCalories.lunch = req.body.lunch;
newCalories.dinner = req.body.dinner;
newCalories.snack = req.body.snack;
newCalories.burned= req.body.burned;
newCalories.total = Number(req.body.breakfast)+Number(req.body.lunch)+Number(req.body.dinner)+Number(req.body.snack)-Number(req.body.burned)
newCalories.save()

// const totalCalories = newCalories+newCalories.breakfast
.then(calories => {
    console.log(calories)
    
    return res.render('main/calories', {calories:calories})
    
}).catch(err=>{
    
    return res.status(400).json({message:'error', err})
}).catch(err=>{
    return next(err);
    })
}
);



module.exports=router;