const express = require('express').Router
const blogSchema = require('../model/blog')
const router = express()

const multer = require('multer')

const FILE_TYPE_MAP={
     'image/png': 'png',
     'image/jpeg': 'jpeg',
     'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isVaild = FILE_TYPE_MAP[file.mimetype]
        let uploadError = new Error('invalid image type')
        if(isVaild){
            uploadError = null
        }
      cb(uploadError, './public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('_')
        const extension = FILE_TYPE_MAP[file.mimetype]
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
   
  const uploadOptions = multer({ storage: storage })
  


//insert new training
router.post('/blog', uploadOptions.single('featuredImage'), async (req, res) => {
  //inpput to the trainiing data
  const file = req.file 
  if(!file) return res.status(400).send('No image is uploaded, upload a image ')

  const fileName = req.file.filename
  const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
    const blogField = new blogSchema({
        title: req.body.title,
        post: req.body.post,
        author: req.body.author,
        categories: req.body.categories,
        tags: req.body.tags,
        featuredImage: `${basePath}${fileName}`
    })
   const fields= await blogField.save()
    if(!fields)
    return res.status(404).send({message: 'Post is not created'})

    res.send({data: fields})

})


// get new training
router.get('/blog', async (req, res)=>{
        const bloglist = await blogSchema.find()
    if (!bloglist) {
        res.status(500).json({
            message: "No author found "
        })
    }
    
    res.status(200).json({data: bloglist})
})        

//get blog by id
router.get('/blog/:id', async(req,res)=>{
    const blogid = await blogSchema.findById(req.params.id).populate('categories', 'category').populate('tags', 'tag')
    if(!blogid){
    res.status(500).json({
        success: false,
        message: "No data for the author requested"
    })
}
    res.status(200).json({data: blogid})
})



//delete author
router.delete('/blog/:id', async(req, res) => {
    const author = await blogSchema.findByIdAndRemove(req.params.id)
    .then(author => {if(author){
       return res.status(200).json({
           success: true,
           message: "Successfully deleted"
       })
    }else{
        return res.status(200).json({
            success: false,
            message: "the author cannot be found"
        })
    }
    }).catch(err=>{
          return res.status(400).json({
            success: false,
            error: err})
    }) })
    


 

 

module.exports = router