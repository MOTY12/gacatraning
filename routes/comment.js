const express = require('express').Router
const commentSchema = require('../model/comment')
const moment = require('moment')
const router = express()


// get new training
router.get('/comment', async (req, res)=>{
        const commentlist = await commentSchema.find()
    if (!commentlist) {
        res.status(500).json({
            message: "No comment found "
        })
    }
    
    res.status(200).json({data: commentlist})
})        


//insert new training
router.post('/comment', async (req, res) => {
        const commentField = new commentSchema({
            comment: req.body.comment,
            name: req.body.name,
            email: req.body.email,
            website: req.body.website,
            currenttime:  moment().format('MMMM Do YYYY, h:mm:ss a')
        })
       const fields= await commentField.save()
        if(!fields)
        return res.status(404).send({message: 'Comment is not created'})
    
        res.send({data: fields})

})


router.get('/comment/:id', async(req,res)=>{
    const categoryid = await commentSchema.findById(req.params.id)
    if(!categoryid){
    res.status(500).json({
        success: false,
        message: "No comment for the comment requested"
    })
}
    res.status(200).json({data: categoryid})
})

//update comment 
// router.update(){

// }

//delete comment
router.delete('/comment/:id', async(req, res) => {
    const comment = await commentSchema.findByIdAndRemove(req.params.id)
    .then(comment => {if(comment){
       return res.status(200).json({
           success: true,
           message: "Successfully deleted"
       })
    }else{
        return res.status(200).json({
            success: false,
            message: "the comment cannot be found"
        })
    }
    }).catch(err=>{
          return res.status(400).json({
            success: false,
            error: err})
    }) })
    

//count number of comment 

router.get('/comment/count', async (req,res)=>{
    const countcomment =  await commentSchema.countDocuments((count) => count)
     
     if(!countcomment){
         res.status(200).send('No comment Found')
     }
     
     res.status(500).send({commentcount: countcomment})
     })
 

 

module.exports = router