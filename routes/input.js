const express = require('express')
const router = express.Router()
//const InputField = require('../model/input') 
const FieldInput = require('../model/fieldinput')
// const ExcelJs = require('exceljs')
// const moment = require('moment')



router.post('/inputfields', async (req, res)=>{
    // const inputFieldIds = Promise.all(req.body.inputFields.map(async(inputField) => {
    //     let newInputField = new InputField({
    //         inputtext: inputField.inputtext
    //     })
    //    newInputField = await newInputField.save()
    //    return newInputField._id
    // }))
   // inputFieldIdsResolved = await inputFieldIds
    const inputsFields = new FieldInput({
        fieldName: req.body.fieldName,
        inputFields: req.body.inputFields
    })
    
   const inputfields= await inputsFields.save()
    if(!inputfields)
    return res.status(404).send({message: 'No Input!!!'})

    res.send({inputfields})
})



// get new training
router.get('/inputfields', async (req, res)=>{
    const inputField = await FieldInput.find()
if (!inputField) {
    res.status(500).json({
        success: false,
        message: "No field found "
    })
}

res.status(200).json({inputField})
})        

//get by field id

router.get('/inputfields/:id', async(req,res)=>{
    const inputFieldid = await FieldInput.findById(req.params.id)
    if(!inputFieldid){
    res.status(500).json({
        success: false,
        message: "No registered candidate"
    })
}
    res.status(200).json({inputFieldid})
})

//delete candidate information

router.delete('/inputfields/:id', async(req, res) => {
    const inputfield = await FieldInput.findByIdAndRemove(req.params.id)
    .then(inputfield => {if(inputfield){
       return res.status(200).json({
           success: true,
           message: "Successfully deleted"
       })
    }else{
        return res.status(200).json({
            success: false,
            message: "No candidate found"
        })
    }
    }).catch(err=>{
          return res.status(400).json({
            success: false,
            error: err})
    }) })
    

    
//filter by by form name 

router.get('/inputfields', async (req, res)=>{
    let filter= {}
    if(req.query.fieldsnames){
        const filter = {fieldname: req.query.fieldsnames.split(',')}
    }
    const inputField = await FieldInput.find('filter').populate('fieldName')
if (!inputField) {
    res.status(500).json({
        success: false,
        message: "No field found "
    })
}

res.status(200).json({data: inputField})
})        



// get new training
router.get('/excelre', async (req, res)=>{
    const inputField = await FieldInput.find()
//console.log(inputField)
res.status(200).json({inputField})
})        


module.exports = router