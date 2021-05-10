const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
     tag:{
        type: String,
    },
    
    dateCreated: {
        type: Date,
        default: Date.now()
    }

})

//to change _id to id for frontend friendly use 
tagSchema.virtual('id').get(function (){
    return this._id.toHexString()
})
tagSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Tag', tagSchema)