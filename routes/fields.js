const express = require('express').Router
const FormField = require('../model/formfield') 
const json2xls = require('json2xls')
const isJson= require('is-json')
const router = express()


// get new training
router.get('/field', async (req, res)=>{
        const fieldlist = await FormField.find()
    if (!fieldlist) {
        res.status(500).json({
            success: false,
            message: "No field found "
        })
    }
    
    res.status(200).json({data: fieldlist})
})        


//insert new training
router.post('/field', async (req, res) => {
        let field = new FormField({
            fieldName: req.body.fieldName
        })
       const fields= await field.save()
        if(!fields)
        return res.status(404).send({message: 'Field cannot be created'})
    
        res.send({data: fields})

})


router.get('/field/:id', async(req,res)=>{
    const fieldid = await FormField.findById(req.params.id)
    if(!fieldid){
    res.status(500).json({
        success: false,
        message: "No data for the field requested"
    })
}
    res.status(200).json({data: fieldid})
})



//delete category
router.delete('/field/:id', async(req, res) => {
    const field = await Field.findByIdAndRemove(req.params.id)
    .then(field => {if(field){
       return res.status(200).json({
           success: true,
           message: "Successfully deleted"
       })
    }else{
        return res.status(200).json({
            success: false,
            message: "the Field cannot be found"
        })
    }
    }).catch(err=>{
          return res.status(400).json({
            success: false,
            error: err})
    }) })
    


 

 

module.exports = router