const mongoose = require('mongoose')

const trainingSchema = new mongoose.Schema({
    
    banner: {
        type: String,
    },
    trainingTitle: {
        type: String
    },
    courseTitle: {
        type: String
    },
    description:{
        type: String
    },
    form:{
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }

})

//to change _id to id for frontend friendly use 
trainingSchema.virtual('id').get(function (){
    return this._id.toHexString()
})
trainingSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Training', trainingSchema)