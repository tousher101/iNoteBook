const mongoose =require('mongoose');
const {Schema}=mongoose;
const  NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    },
    subject:{
        type:String,
        required: true
    },
    description:{
        type:String,
        default: ""
    
    }
});
module.exports=mongoose.model('notes', NotesSchema);