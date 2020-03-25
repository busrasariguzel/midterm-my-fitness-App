const mongoose = require('mongoose');


const workoutSchema = new mongoose.Schema({
    name:{type:String, required: true, trim: true},
    duration: {type:String, required: true, trim: true},
    image: {
        name:{type:String, default:''},
        picture:{type:String, default:''},
    },
    description: {type:String}
});

module.exports=mongoose.model('Workout', workoutSchema)
