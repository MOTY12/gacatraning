const mongoose = require('mongoose')

const inputSchema = new mongoose.Schema({
    
    inputtext:[{
        type: String,
    }],
    
    dateCreated: {
        type: Date,
        default: Date.now()
    }

})

// //to change _id to id for frontend friendly use 
// fieldSchema.virtual('id').get(function (){
//     return this._id.toHexString()
// })
// fieldSchema.set('toJSON', {
//     virtuals: true
// })

module.exports = mongoose.model('InputField', inputSchema)