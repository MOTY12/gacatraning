const express = require('express').Router
const categorySchema = require('../model/category')
const router = express()


// get new training
router.get('/category', async (req, res)=>{
        const categorylist = await categorySchema.find()
    if (!categorylist) {
        res.status(500).json({
            message: "No category found "
        })
    }
    
    res.status(200).json({data: categorylist})
})        


//insert new training
router.post('/category', async (req, res) => {
        const categoryField = new categorySchema({
            category: req.body.category
        })
       const fields= await categoryField.save()
        if(!fields)
        return res.status(404).send({message: 'Category is not created'})
    
        res.send({data: fields})

})


router.get('/category/:id', async(req,res)=>{
    const categoryid = await categorySchema.findById(req.params.id)
    if(!categoryid){
    res.status(500).json({
        success: false,
        message: "No data for the category requested"
    })
}
    res.status(200).json({data: categoryid})
})



//delete category
router.delete('/category/:id', async(req, res) => {
    const category = await categorySchema.findByIdAndRemove(req.params.id)
    .then(category => {if(category){
       return res.status(200).json({
           success: true,
           message: "Successfully deleted"
       })
    }else{
        return res.status(200).json({
            success: false,
            message: "the category cannot be found"
        })
    }
    }).catch(err=>{
          return res.status(400).json({
            success: false,
            error: err})
    }) })
    


 

 

module.exports = router