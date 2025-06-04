
const mongoose=require('mongoose')
const mongoURI = process.env.MONGODB_URI
const connectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=> console.log('Connect to mongo Successfuly')).catch((err)=>console.log(err))
}
module.exports = connectToMongo;