const express = require('express')
const router = express.Router()
const Training = require('../model/training') 
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
router.post('/top', uploadOptions.single('banner'), async (req, res) => {
    
//input to the trainiing data
const file = req.file 
if(!file) return res.status(400).send('No image is uploaded, upload a image ')

const fileName = req.file.filename
const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`

        const training = new Training({
            banner: `${basePath}${fileName}`,
            trainingTitle: req.body.trainingTitle,
            courseTitle: req.body.courseTitle,
            description: req.body.description,
            form: req.body.form
        })
       const trainings= await training.save()
        if(!trainings)
        return res.status(404).send({message: 'Training cannot be created'})
        res.send({data: trainings})
        
    })

//get new training
router.get('/top/',async (req, res)=>{
        const traininglist = await Training.find()
    res.json({data: traininglist})
    if (!traininglist) {
        res.status(500).json({
            success: false,
            message: "No training found "
        })
    }
})             


//get new training by id
router.get('/top/:id', async(req,res)=>{
    const trainingid = await Training.findById(req.params.id)
    //.populate('form', 'fieldName')
    if(!trainingid){
    res.status(500).json({
        success: false,
        message: "No data for the field requested"
    })
}
    res.status(200).json({data: trainingid})
})


// //count the number of candidate
// router.get('/count', async (req,res)=>{
//    const countcandidate =  await Training.countDocuments((count) => count)
    
//     if(!countcandidate){
//         res.status(200).send('No candidate Found')
//     }
//     res.status(500).send({candidatecount: countcandidate})
//     // console.log(countcandidate)
//     })
    

//update the trainingss 
router.put('/top/:id', uploadOptions.single('banner'), async(req, res) => {
      
        //input to the trainiing data
        const file = req.file 
        if(!file) return res.status(400).send('No image is uploaded, upload a image ')
        
        const fileName = req.file.filename
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
    
        const updatetraining= await Training.findByIdAndUpdate(
            req.params.id,
            {
                banner: `${basePath}${fileName}`,
                trainingTitle: req.body.trainingTitle,
                courseTitle: req.body.courseTitle,
                description: req.body.description,
                form: req.body.form
            },
            {
                new:true
            }
        )
        if(!updatetraining){
            res.status(500).json({
                success: false,
                message: "the training information cannot be found"
            })
        }else{
            res.send(updatetraining)
        }
       
    })



    //delete the training

    router.delete('/top/:id', async(req, res) => {
        const training = await Training.findByIdAndRemove(req.params.id)
        .then(training => {if(training){
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



module.exports = router