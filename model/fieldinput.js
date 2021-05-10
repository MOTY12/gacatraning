const mongoose = require('mongoose')

const fieldinputSchema = new mongoose.Schema({
    
    fieldName:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Training',
        required: true
    },
    // inputFields:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'InputField',
    //     required: true
    // }],

     inputFields:{
        type: String,
    },
    
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

module.exports = mongoose.model('fieldInput', fieldinputSchema)