const router = require('express').Router();
const Workout = require('./models/Workout');
const faker = require('faker')
const workoutController =require('./controllers/workoutController')
const {addWorkout
    } = require('./controllers/workoutController')


    router.get('/track')
    // router.post('/track', addWorkout)

    router.get('/workout', (req,res)=>{
        return res.render('main/track', {workout:null})
})

router.post('/workout', (req,res,next)=>{
    
    const newWorkout = new Workout();
    newWorkout.name = faker.lorem.words()
    newWorkout.duration = '30 mins'
    newWorkout.image = faker.image.sports();
    newWorkout.description = faker.lorem.paragraph()

    newWorkout.save().then(workout => {
        console.log(workout)
        return res.render('main/track', {workout})
    }).catch(err=>{
        
        return res.status(400).json({message:'error'})

    })
    }

);






module.exports=router;