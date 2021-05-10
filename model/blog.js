const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
     title:{
        type: String,
    },
    post:{
        type: String,
    },
    author:{
        type: String,
    },
    categories:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    tags:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true
    },
    featuredImage:{
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }

})

//to change _id to id for frontend friendly use 
blogSchema.virtual('id').get(function (){
    return this._id.toHexString()
})
blogSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('Blog', blogSchema)