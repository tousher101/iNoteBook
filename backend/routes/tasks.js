const express = require('express');
const router = express.Router();
const verification = require('../midle-wear/verificatio');
const Tasks = require('../models/Tasks');
const { body, validationResult, query } = require('express-validator');
const { default: mongoose } = require('mongoose');




// Add Tasks Route (auth need)
router.post('/addtasks',verification,[body('title').isLength({min:3}), body('description').isLength({min:3}),body('deadline').isDate()],
async(req,res)=>{
    const errors = validationResult(req); // Ekahne Validator er result display kora hoice
    if (!errors.isEmpty()) {
    return res.status(400).json({ faild: 'Something Went Wrong. Check Your Information', errors: errors.array() });
    }
    try{
    const {title,description,deadline}=req.body;
    const task = new Tasks({title,description,deadline, user: req.user.id, status:'pending'});
    const saveTask = await task.save();
    res.status(200).json({msg: 'Your Task Added'})

    }catch(error){console.error(error); res.status(500).json({msg:'Server Error'})}
});

// Fetch All Notes. Verification Reqired
router.get('/fetchtasks', verification, async(req,res)=>{
    const total = await Tasks.countDocuments({user: req.user.id})
    const limit = parseInt(req.query.limit)||10;
    const page = parseInt(req.query.page)|| 1;
    const skip = (page-1)*limit;

    try{
        const task = await Tasks.find({user:req.user.id}).skip(skip).limit(limit).sort({Date:-1})
         const today = new Date();
    today.setHours(0,0,0,0)
   const Updatetasks= await Promise.all (task.map(async(tasks)=>{
      const deadline = new Date(tasks.deadline);
    if(!deadline) return;
    const differTime=deadline.getTime() - today.getTime();
        remainingTime = Math.ceil(differTime/(1000*60*60*24))
    let updatedStage = tasks.stage;
    if(updatedStage==='overdue'){res.status(202).json({msg:'Some of task Overdeu'})}
    if(deadline < today && updatedStage !== 'completed'){updatedStage='overdue'}
       await tasks.save()
    return{
        ...tasks._doc,
        remainingTime,
        updatedStage
    }
   }));
        
      res.status(200).json({tasks:Updatetasks,totalPage:Math.ceil(total/limit)})
      
    }catch(error){console.error(error);
        res.status(500).json({msg:'Server Error'})
    }
});



// Start Task: verification required
router.put('/starttask/:id', verification, async(req,res)=>{
    const task = await Tasks.findById(req.params.id)
    if (!task){res.status(404).json({msg:'Task Not Found'})}
    if(task.user.toString()!== req.user.id){ return res.status(401).json({msg:'User Not Allowed'})}
    const deadline = new Date(task.deadline);
    if(!deadline) return;
    let updatedStage = task.stage;
    if(updatedStage==='ongoing' || updatedStage==='completed'|| updatedStage==='overdue'){ return res.status(400).json({msg:'Your Task Already Started'})}
    if(updatedStage==='pending'){updatedStage='ongoing'; res.status(200).json({msg: 'Your Task Started'});
    const updateTask = await Tasks.findByIdAndUpdate(req.params.id,{stage:updatedStage}, {new:true}); await updateTask.save()}
    
    

    
 



});

//Complete route verification need:

router.put('/completetask/:id', verification,async(req,res)=>{
    try{
let task = await Tasks.findById(req.params.id)
if(!task){return res.status(404).json({msg:'Task Not Found'})}
if(task.user.toString() !== req.user.id){return res.status(401).json({msg:'User Not Allowed'})};
let updateStage = task.stage
if(updateStage==='completed'){return res.status(400).json({msg:'Task already completed'})}
if(updateStage=== 'overdue'){return res.status(401).json({msg:'Task Is Overdeu'})}
if(updateStage==='ongoing'){updateStage = 'completed'; res.status(200).json({msg:'Task Completed'});
task= await Tasks.findByIdAndUpdate(req.params.id,{stage:updateStage},{new:true});

}




}catch(error){console.error(error);
    res.status(500).json({msg:'Server Error'})}
});

//updateTask router verification need
router.put('/updatetask/:id',verification, async(req,res)=>{
    const {title, description, deadline}=req.body;
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).send('Invalid ObjectId')}
        const newTask = {};
        if(title){newTask.title = title}
        if(description){newTask.description = description}
        if(deadline){newTask.deadline=deadline}

        let task = await Tasks.findById(req.params.id);
        if(!task){return res.status(404).json({msg:'Task Not Found'})};
        if(task.user.toString() !== req.user.id){return res.status(401).json({msg: 'User Not Allowed'})};
        task = await Tasks.findByIdAndUpdate(req.params.id,{$set:newTask},{new:true});
        res.status(200).json({msg:'Your Task Updated'});
    }catch(error){console.error(error);
        res.status(500).json({msg:'Server Error'});
    }
});

// Delete Task. Verification need

router.delete('/deletetask/:id',verification, async(req,res)=>{
    
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).send('Invalid ObjectId')}

        let task = await Tasks.findById(req.params.id);
        if(!task){return res.status(404).json({msg:'Task Not Found'})};
        if(task.user.toString() !== req.user.id){return res.status(401).json({msg: 'User Not Allowed'})};
        task = await Tasks.findByIdAndDelete(req.params.id);
        res.status(200).json({msg:'Your Task Deleted'});
    }catch(error){console.error(error);
        res.status(500).json({msg:'Server Error'});
    }
});

// search task by title/stage verification needed

router.get('/search', verification, async(req,res)=>{
    try{
        const user = req.user.id;
        if(!user){return res.status(404).json({msg:'User not found'})}
    const taks = await Tasks.find({user,
        $or:[
            {title:{$regex:query, $options: 'i'}, stage:{$regex:query, $options: 'i'}}]
    });
    res.status(200).json(taks)
}catch(error){console.error(error);
        res.status(500).json({msg:'Server Error'});
    }
});





module.exports=router