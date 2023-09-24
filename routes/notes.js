const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../Models/Note');
const{ body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Harryisagoodboy';

// Route 1: Get All the notes using: Get "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async(req,res)=>{
    try{
        const notes = await Note.find({user: req.user.id});
         res.json(notes)
    } catch(error){
        console.error(error.message);
    res.status(500).send("Internal server error");
    }
})


// Route 2: Add a new Note using Post "/api/notes/addnotes". Login required
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({min:3}),
    body('description', 'Description  must be atleast 5 caharacters').isLength({ min: 5})], async(req,res)=>
    {

     try {
        const {title, description, tag} = req.body;
     // if there are errors, returns bad request and the errors
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array()});
     }
         const note = new Note({
             title, description, tag, user: req.user.id
            })
            const savedNote = await note.save();
            
            res.json(savedNote)
        } 
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        } } )

// Route 3: Update an existing note using PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async(req,res)=>{
     const {title, description, tag} = req.body;

     try{
     // create anew note object
     const newNote =  {};
     if(title)
     {
        newNote.title = title
     };
     if(description){
        newNote.description=description
     };
     if(tag){
        newNote.tag=tag   
      };

      // find the note to be updated and update it

      let note = await Note.findById(req.params.id);
      if(!note){
        return res.status(404).send("NOT FOUND");
      }

      if(!note){
        return res.status(404).send("NOT FOUND");
      }

      if(note.user.toString() !== req.user.id){
        return res.status(401).send("NOT ALLOWED");
      }

      note  = await Note.findByIdAndUpdate(req.params.id, {$set: newNote},{new: true})

      res.json({note});
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    })

    // Route 3: Update an existing note using DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async(req,res)=>{
     // find the note to be deleted and delete it

     try{
     let note = await Note.findById(req.params.id);
     if(!note){
       return res.status(404).send("NOT FOUND");
     }

     if(!note){
       return res.status(404).send("NOT FOUND");
     }
//   Allow deletion only if user owns this note
     if(note.user.toString() !== req.user.id){
       return res.status(401).send("NOT ALLOWED");
     }

     note  = await Note.findByIdAndDelete(req.params.id);

     res.json({"Success": "NOte has been deleted", note: note});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
   })
        module.exports = router;