const express = require('express')
const router = express.Router()
const fieldInput = require('../model/fieldinput')
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

//inpput to the trainiing data
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
  //  const countcandidate = await FieldInput.countDocuments({fieldName: req.query.fieldName})

  const array_elements = await fieldInput.find().select('fieldName')
  array_elements.sort();

  var current = null;
  var cnt = {};
  for (var i = 1; i < array_elements.length; i++) {
      if (cnt[array_elements[i].fieldName]) {
          cnt[array_elements[i].fieldName] = cnt[array_elements[i].fieldName] + 1;
      } else {
          cnt[array_elements[i].fieldName] = 1;
      }
  }
  // console.log(cnt);
  for (var key in cnt) {
      // console.log(key);
      const filter = { _id: key };
      const retrieved = await Training.findOne(filter);
      // console.log(retrieved);
      if (retrieved != null) {
          retrieved.countcandidate = cnt[key];
          await retrieved.save();
          doc = await Training.findOne(filter);
          
          //res.json(doc);
        //   console.log(doc.courseTitle);
        //   console.log(doc.countcandidate);
      }
  }




    const traininglist = await Training.find().sort({dateCreated: -1})
    res.json({data: traininglist})
    if (!traininglist) {
        res.status(500).json({
            success: false,
            message: "No training found "
        })
    }
})            











// //get new training
// router.get('/top/',async (req, res)=>{
//         const traininglist = await Training.find()
//     res.json({data: traininglist})
//     if (!traininglist) {
//         res.status(500).json({
//             success: false,
//             message: "No training found "
//         })
//     }
// })             


// //how to count candidate
// router.get('/candidatebytraining', async (req, res) => { 
  
//     const array_elements  = await fieldInput.find().select('fieldName')
//     array_elements.sort();

//     var current = null;
//     var cnt = {};
//     for (var i = 1; i < array_elements.length; i++) {
//         if(cnt[array_elements[i].fieldName]) {
//             cnt[array_elements[i].fieldName] =  cnt[array_elements[i].fieldName] + 1;
//         }else {
//             cnt[array_elements[i].fieldName] = 1;
//         }
//     }
//     console.log(cnt);

// })







//how to count candidate
router.get('/candidatebytraining', async(req, res) => {

    const array_elements = await fieldInput.find().select('fieldName')
    array_elements.sort();

    var current = null;
    var cnt = {};
    for (var i = 1; i < array_elements.length; i++) {
        if (cnt[array_elements[i].fieldName]) {
            cnt[array_elements[i].fieldName] = cnt[array_elements[i].fieldName] + 1;
        } else {
            cnt[array_elements[i].fieldName] = 1;
        }
    }
    // console.log(cnt);
    for (var key in cnt) {
        // console.log(key);
        const filter = { _id: key };
        const retrieved = await Training.findOne(filter);
        // console.log(retrieved);
        if (retrieved != null) {
            retrieved.countcandidate = cnt[key];
            await retrieved.save();
            doc = await Training.findOne(filter);
            
            //res.json(doc);
            console.log(doc.courseTitle);
            console.log(doc.countcandidate);
        }
    }
})





    router.put('/top/:id', uploadOptions.single('banner'), async(req, res) => {
      
        //input to the trainiing data
        const file = req.file 
        //if(!file) return res.status(400).send('No image is uploaded, upload a image ')
        
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
