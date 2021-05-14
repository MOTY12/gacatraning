const mongoose = require('mongoose')

const fieldinputSchema = new mongoose.Schema({
    
    fieldName:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Training',
        required: true
    },

     inputFields:{
        type: String,
    },
    
    dateCreated: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('fieldInput', fieldinputSchema)