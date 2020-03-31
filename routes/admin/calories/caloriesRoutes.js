const router = require('express').Router();
const Calories = require('./models/Calories');



router.get('/', (req,res)=>{
    Calories.find({}).then(calories =>{
        return res.render('main/calories',{ calories })
    })
})

router.post('/', (req,res,next)=>{

const newCalories = new Calories();
newCalories.breakfast = req.body.breakfast;
newCalories.lunch = req.body.lunch;
newCalories.dinner = req.body.dinner;
newCalories.snack = req.body.snack;
newCalories.burned= req.body.burned;

newCalories.save()
.then(calories => {
    console.log(calories)
    res.status(200).json({message: 'Calories Added', calories:calories});
    return res.redirect('/calories', {calories})
    
}).catch(err=>{
    
    return res.status(400).json({message:'error', err})
});
}
);



module.exports=router;