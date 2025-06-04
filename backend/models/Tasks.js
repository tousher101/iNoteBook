const mongoose= require('mongoose');
const {Schema}=mongoose;
const TasksSchema = new Schema({

    user:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'user' 
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    deadline:{
        type: Date,
        default: ''
    },
    createAt:{
    type:Date,
    default:Date.now
    },
    stage:{
        type:String,
        enum:['pending','ongoing','completed','overdue'],
        default:'pending'
    }

})
module.exports=mongoose.model('tasks',TasksSchema)