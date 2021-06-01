const express = require('express')
const router = express.Router()
const fieldInput = require('../model/fieldinput')
const Training = require('../model/training')
const cloudinary = require('cloudinary').v2


cloudinary.config({
    cloud_name: 'moty',
    api_key:  '615853392486882',
    api_secret: 'dcRHd85UruOszV-PBtog6itjQb8'
});

            
//insert new  training
router.post('/top', async(req, res) => {
    const file = req.files.banner
     const result = await cloudinary.uploader.upload( file.tempFilePath)
      const tom = result.url
       const training = new Training({
                    banner: tom,
                    trainingTitle: req.body.trainingTitle,
                    courseTitle: req.body.courseTitle,
                    description: req.body.description,
                    form: req.body.form
                })
                const trainings= await training.save()
                        if(!trainings)return res.status(404).send({message: 'Training cannot be created'})
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


//update training
router.put('/top/:id', async(req, res) => {
    try {
        const file = req.files.banner
        const result = await cloudinary.uploader.upload(file.tempFilePath)
         const tom = result.url
       
           const updatetraining= await Training.findByIdAndUpdate(
               req.params.id,
               {
                   banner: tom,
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
      
      } catch (err) {
        console.log(err);
      }
    });
    




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
