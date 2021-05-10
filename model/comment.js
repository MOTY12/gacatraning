const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment:{
        type: String,
    },
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    website:{
        type: String,
    },
    currenttime:{
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }

})

//to change _id to id for frontend friendly use 
commentSchema.virtual('id').get(function (){
    return this._id.toHexString()
})
commentSchema.set('toJSON', {
    virtuals: true
})


module.exports = mongoose.model('Comment', commentSchema)