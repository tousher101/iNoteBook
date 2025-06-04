const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const verification = require('../midle-wear/verificatio')
const { body, validationResult } = require('express-validator');
const { default: mongoose } = require('mongoose');


//Route-1 Get All the Notes using: GET "/api/notes/fetchallnotes": Login Required
router.get(`/fetchallnotes`, verification, async(req,res)=>{
  const total = await Notes.countDocuments({user:req.user.id})
  const limit = parseInt(req.query.limit)||10;
  const page = parseInt(req.query.page)||1;
  
  const skip = (page-1)*limit;
      try{
    const notes = await Notes.find({user:req.user.id}).skip(skip).limit(limit).sort({date:-1});

    res.status(201).json({notes,totalPage:Math.ceil(total/limit)});
    
   

    }catch (error) {console.error(error.massage);
    res.status(500).json({faild:'Something went Wrong' , error:error.massage})
    }
});
//Route-2 Add Note the Notes using: POST "/api/notes/addnote": Login Required

router.post('/addnote', verification, [body('name','Enter Valid Title').isLength({min:3}), //This one Express Validetor Apply Kora hoice
     body('subject','Enter Valid Subject').isLength({min:3})], 
      async(req,res)=>{
        const {name, subject, description}=req.body
        const errors = validationResult(req); // Ekahne Validator er result display kora hoice
            if (!errors.isEmpty()) {
            return res.status(400).json({ faild: 'Something Went Wrong. Check Your Information', errors: errors.array() });
            }
      try{
        const notes =  new Notes({name, subject, description, user:req.user.id });
        const saveNots = await notes.save();
        res.status(201).json({ msg:'Note Added!'});
    }catch (error) {console.error(error.massage);
    res.status(500).json({faild:'Something went Wrong' , error:error.massage})
    }
});


//Route-3 Update  the exsiting Notes using: PUT "/api/notes/updatenote/:id": Login Required
router.put('/updatenote/:id', verification,async(req,res)=>{
        const {name,subject,description}=req.body
            try{
              if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                return res.status(400).send('invalid objectId')
              } // for more protection
              //Create newnote object:
              const newNote = {};
              if(name){newNote.name = name};
              if(subject){newNote.subject = subject};
              if(description){newNote.description=description}
              //Find the note to be updated and update it
              let note = await Notes.findById(req.params.id)
              if(!note){return res.status(404).json({msg:'Note not found'})}
              if(note.user.toString() !== req.user.id){return res.status(401).json({msg:"User not allowed"})}
              note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true}) 
              res.status(200).json({note, msg:'Your note has been updated'})

            }catch(error){console.error(error.message);
              res.status(500).json({erro:'server erorr'})
            }

          });

//Route-4 Delete  the exsiting Notes using: DELETE "/api/notes/deletenote/:id": Login Required
router.delete('/deletenote/:id', verification,async(req,res)=>{
            try{
              if(!mongoose.Types.ObjectId.isValid(req.params.id)){
                return res.status(400).send('invalid objectId')
              } // for more protection
              //Create newnote object:
              //Find the note to be deleted and delete it
              let note = await Notes.findById(req.params.id)
              if(!note){return res.status(404).json({msg:'Note Not Found '})}
              if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
              note = await Notes.findByIdAndDelete(req.params.id) 
              res.status(200).json({Success: 'Your Note Has Been Deleted'})

            }catch(error){console.error(error.message);
              res.status(500).json({erro:'server erorr'})
            }

          });
  
   //Route-5 Search Notes on Our note: POST "/api/notes/search": Login Required
   router.get('/search', verification, async(req,res)=>{
    const quary = req.query.q
    try{
      const notes = await Notes.find({user: req.user.id,
        $or:[
          {name:{$regex:quary, $options: 'i'}},{subject:{$regex:quary, $options:'i'}}]
      });
      res.status(200).json(notes);

    }catch(error){console.error(error);
      res.status(500).send('Server Error')
    }
   })


/*          //Route-5 Add Description on Our note: PUT "/api/notes/adddescription/:id": Login Required

router.put('/adddescription/:id', verification, [body('description','Length Must Be Min 10 Words').isLength({min:10})] //This one Express Validetor Apply Kora hoice
     , async(req,res)=>{
        const {description}=req.body
        const errors = validationResult(req); // Ekahne Validator er result display kora hoice
            if (!errors.isEmpty()) {
            return res.status(400).json({ faild: 'Something Went Wrong. Check Your Information', errors: errors.array() });
            }
      try{
          if(!mongoose.Types.ObjectId.isValid(req.params.id)){ return res.status(401).send("Not Allowd")}

        let note = await Notes.findById(req.params.id);
        if (!note){ return res.status(404).send('Note Not Found')};
       if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
        note.description=description;
        await note.save()
        res.status(200).json({Success:'Your Description Has Been Added'})

            } catch(error){console.error(error.message);
              res.status(500).json({erro:'server erorr'})
            }

          });*/







module.exports= router