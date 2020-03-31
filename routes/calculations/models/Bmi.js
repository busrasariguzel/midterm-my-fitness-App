const mongoose = require('mongoose');


const bmiSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    weight:{type:Number, required: true, trim: true},
    height: {type:Number, required: true, trim: true},
});

module.exports=mongoose.model('Bmi', bmiSchema)