const router = require('express').Router();
const Workout = require('./models/Workout');
const faker = require('faker')
const workoutController =require('./controllers/workoutController')
const {addWorkout
    } = require('./controllers/workoutController')
let fetch = require('node-fetch')


    // router.post('/track', addWorkout)

    router.get('/workout', (req,res)=>{
        Workout.find({}).then(workout =>{

            return res.render('main/track',{ workout })
        })
})

router.post('/workout', (req,res,next)=>{
    fetch('https://wger.de/api/v2/exerciseimage/?format=json')
    .then(res=>res.json())
    // .then(results => {
    // results.map(({images}) => {
    .then(({results})=>{ return results.forEach((obj)=> {
            console.log(obj.image)
        
    // let image = images
    
    // console.log(images)
    
    const newWorkout = new Workout();
    newWorkout.name = faker.lorem.words();
    newWorkout.duration = '30 mins'
    newWorkout.image.picture = obj.image;
    // newWorkout.image.picture = faker.image.sports()
    newWorkout.description = faker.lorem.sentence();
    
    newWorkout.save()
    })
}).then(workout => {
        console.log(workout)
        res.status(200).json({message: 'Workout Added', workout: workout});
        return res.redirect('/track/workout', {workout})
        
    }).catch(err=>{
        
        return res.status(400).json({message:'error', err})
})
    }
);

router.get('/single-workout/:id', (req,res,next)=> {
    Workout.findById({_id:req.params.id}, (err,workout)=>{
        if(err) return next(err)
        return res.render('main/single-workout', {workout})
        // return res.status(200).json({message: 'single workout viewed', workout})
    })
})


module.exports=router;