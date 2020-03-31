const mongoose = require('mongoose');


const caloriesSchema = new mongoose.Schema({
    breakfast:{type:Number, trim: true},
    lunch:{type:Number, trim: true},
    dinner:{type:Number, trim: true},
    snack: {type:Number, trim: true},
    Burned: {type:Number, trim: true},
});

module.exports=mongoose.model('Calories', caloriesSchema)
