const express = require('express')
const router = express.Router()
const FieldInput = require('../model/fieldinput')



router.post('/inputfields', async (req, res)=>{
    const inputsFields = new FieldInput({
        fieldName: req.body.fieldName,
        inputFields: req.body.inputFields
    })
    
   const inputfields= await inputsFields.save()
    if(!inputfields)
    return res.status(404).send({message: 'No Input!!!'})

    res.send({inputfields})
})



// get new candidate
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

// router.get('/inputfields', async (req, res)=>{
//     let filter= {}
//     if(req.query.fieldsnames){
//         const filter = {fieldname: req.query.fieldsnames.split(',')}
//     }
//     const inputField = await FieldInput.find('filter').populate('fieldName')
// if (!inputField) {
//     res.status(500).json({
//         success: false,
//         message: "No field found "
//     })
// }

// res.status(200).json({data: inputField})
// })        


//count the number of candidate
router.get('/inputcount', async (req,res)=>{
    const countcandidate =  await FieldInput.countDocuments((count) => count)
     
     if(!countcandidate){
         res.status(200).send('No candidate Found')
     }
     res.status(500).send({candidatecount: countcandidate})
     console.log(countcandidate)
     })





     
//update the candidate
router.put('/top/:id', async(req, res) => {
    const updatecandidate= await FieldInput.findByIdAndUpdate(
        req.params.id,
        {
            fieldName: req.body.fieldName,
            inputFields: req.body.inputFields
        },
        {
            new:true
        }
    )
    if(!updatecandidate){
        res.status(500).json({
            success: false,
            message: "the shop cannot be found"
        })
    }else{
        res.send(updatecandidate)
    }
   
})




module.exports = router