const mongoose =require('mongoose');
const {Schema}=mongoose;
const  UserSchema = new Schema({
    name:{
        type:String,
        required: true
    },
   email: {
        type:String,
        required:true,
        unique: true,
    },
    password:{
        type:String,
        required: function() {return !this.googleId;}
    },
    date:{
        type:Date,
        default: Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    photo:{
        url:String,
        public_id:String,
       
    },
    photos:[
        {
            url:String,
            public_id:String
        },
        {
            url:String,
            public_id:String
        },
        {
            url:String,
            public_id:String
        },
        {
            url:String,
            public_id:String
        },
        {
            url:String,
            public_id:String
        }
    ]
});

const user = mongoose.model('user', UserSchema);
module.exports=user;
