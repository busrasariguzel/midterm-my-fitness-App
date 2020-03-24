const Category = require('../../categories/models/Category')
const async = require('async');

const faker = require('faker');
const Workout =require('../models/Workout');



module.exports={
addWorkout:(req,res,next)=>{
    async.waterfall([
        (callback)=>{
            Category.findOne({name:req.params.name},(err,category)=>{
                if(err) return next(err);
                console.log('Waterfall category ...', category);
                callback(null, category)
            })
        },
        (category, callback)=>{
            for(let i=0; i<24 ;  i++){
                const workout = new workout()
                workout.name=faker.commerce.workoutName()
                workout.duration= '30 mins'
                workout.image=``
                workout.description = faker.lorem.paragraph();
                workout.save();
            }
        }
    ])
    req.flash('message', 'Workout created')
    return res.redirect('/auth/track');
},

}
module.exports=router;
