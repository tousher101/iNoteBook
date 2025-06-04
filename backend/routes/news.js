const express = require('express')
const verification = require('../midle-wear/verificatio')
const router = express.Router()
const URI=process.env.NEWS_API_URI
const APIKEY= process.env.NEWS_API_KEY

router.get('/getnews', verification,async(req,res)=>{
  
    try{
  const {category,page}=req.query
    const response= await fetch(`${URI}/v2/top-headlines?country=us&category=${category}&apiKey=${APIKEY}&page=${page}&pageSize=19`)
    const data= await response.json();
    res.status(200).json(data)
    }catch(err){console.error(err); res.status(500).json({msg:'Server Error'})}
})



module.exports=router