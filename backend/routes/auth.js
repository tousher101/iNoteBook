const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET_EMAIL = process.env.MY_EMAIL_SECTRET_CODE;
const JWT_SECRET = process.env.MY_SUPER_SCECRET_CODE;
const JWT_SECRET_PASSWORD_RESET = process.env.MY_PASSWORD_RESET_CODE;
const verification = require('../midle-wear/verificatio')
const sendEmail = require('../utils/sendEmail')
const forgetEmail = require('../utils/pass-reset-send');
const loginLimiter=require('../midle-wear/loginLimiter')





 // Route-1: Create User using API: POST "/api/auth/createuser:"
router.post('/createuser',[body('email','Enter Valid Name').isEmail(), //This one Express Validetor Apply Kora hoice
     body('name','Enter Valid Email').isLength({min:3}),
      body('password', 'Enter Valid Password').isLength({min:5})]
    , async(req,res)=>{

     const errors = validationResult(req); // Ekahne Validator er result display kora hoice
    if (!errors.isEmpty()) {
      return res.status(400).json({ faild: 'Something Went Wrong. Check Your Information', errors: errors.array() });
    }
    try{
        const {name,email,password}=req.body
       let dupUser = await User.findOne({email:req.body.email}); //duplicate email find kore dup user block kore hoice
       if (dupUser){return res.status(401).json({mesg:'Email Already Used. Please Try With Others Email'})}
    // const user= User(req.body);
    // Validator Method  but i want to use my method
    const salt = await bcrypt.genSalt(10);
     const secPass = await bcrypt.hash(password,salt);
    const user =  new User({
    name,
    email,
    password: secPass,
    isVerified: false
});
 const saveUser =  user.save();
    const data ={
        id:user.id
    }
    const jwtToken = jwt.sign(data,JWT_SECRET_EMAIL,{expiresIn:'1h'});
    await sendEmail( email, name, jwtToken );

    res.status(201).json({success:'Your Account Created Successfully Please Verify Your Email', name}) //user creat er por respons msg diya hoice
     } catch(error) {console.error(error.message);
        res.status(500).json('Server Error') // server error catch kora hoice
}
    
});


// Email Verification
router.get('/verification/:token', async(req,res)=>{
    try{
        const token = req.params.token;
        const verifi = jwt.verify(token,JWT_SECRET_EMAIL );
        const user = await User.findById(verifi.id);
        if(!user){ return res.status(404).send(`<html>
    <head>
      <title>Email Verified</title>
      <style>
        body {
          background: #f0f4f8;
          font-family: Arial;
          text-align: center;
          padding-top: 100px;
        }
        .card {
          display: inline-block;
          padding: 30px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 { color: #28a745; }
      </style>
      <script>
        setTimeout(() => {
          window.location.href = "https://inotebook24.netlify.app/signup"; // বা তোমার client এর path
        }, 3000);
      </script>
    </head>
    <body>
      <div class="card">
        <h1> 👀 User Not Found!</h1>
      </div>
    </body>
  </html>`)};


        if(user.isVerified){return res.status(200).send(`<html>
    <head>
      <title>Email Verified</title>
      <style>
        body {
          background: #f0f4f8;
          font-family: Arial;
          text-align: center;
          padding-top: 100px;
        }
        .card {
          display: inline-block;
          padding: 30px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 { color: #28a745; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>✅ Email Allready Verified!</h1>
      </div>
    </body>
  </html>`)}
        user.isVerified = true;
        await user.save();
        res.status(200).send(` <html>
    <head>
      <title>Email Verified</title>
      <style>
        body {
          background: #f0f4f8;
          font-family: Arial;
          text-align: center;
          padding-top: 100px;
        }
        .card {
          display: inline-block;
          padding: 30px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 { color: #28a745; }
      </style>
      <script>
        setTimeout(() => {
          window.location.href = "https://inotebook24.netlify.app/home"; // বা তোমার client এর path
        }, 3000);
      </script>
    </head>
    <body>
      <div class="card">
        <h1>✅ Email Verified Successfully!</h1>
      </div>
    </body>
  </html>`)

    }catch(error){
        res.status(400).send('Expried Token')

    }

});


// Route-2: Loging User using API: POST "/api/auth/login:
router.post('/login',[body('email','Enter Valid Email').isEmail(), //This one Express Validetor Apply Kora hoice
      body('password', 'Password Cannot be Blank').exists()],loginLimiter, async (req,res)=>{
            const errors = validationResult(req); // Ekahne Validator er result display kora hoice
     if (!errors.isEmpty()) {
      return res.status(400).json({ faild: 'Something Went Wrong. Check Your Information', errors: errors.array() });
    }   const {email,password}= req.body
        try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(404).json({msg:'Please Try To Login With Correct Information'})
        }
        const passwordCompared = await bcrypt.compare(password,user.password);
        if(!passwordCompared){
            return res.status(404).json({msg:'Please Try To Login With Correct Information'})
        }
        const data ={
        id:user.id
    }   
    const Token = jwt.sign(data,JWT_SECRET,{expiresIn:'1d'})
    //cookie base token send and save at cookie
    //res.cookie('token',token,{httpOnly:true, secure: process.env.NODE_ENV(.env file e NODE_ENV='production' Korte hobe
    //==='production, sameSite: 'strict',maxAge:(ei field ta conditional dite hoi. na dile session er moto kaj kore
    //remember me korele remeberMe? in miliSec:undefiend korel session))})
     res.status(201).json({ msg:'Login Successfully',Token }) //user creat er por respons msg diya hoice
        }catch(error){console.error(error.message);
            res.status(500).json('Server Error')
        }

      });

      /*cookeis based token er jonno alada logout route banate hobe. karon ei cookeis js dara clear kora jay na
      router.get('/logout, async(req,res)=>{
        res.clearCookies('token',{
        httpOnly:true,
        secure: process.env.NODE_ENV==='production',
        sameSite:'strict'});
        res.status(200).json({msg:logout Success})
        
        }) */

// Route-3: Loging User verification API: POST "/api/auth/getuser:
router.get('/getuser', verification, async (req,res)=>{
    try {
   const userId= req.user.id
        const user = await User.findById(userId).select("-password")

        res.send(user)
        
    }catch(error){console.error(error.message);
            res.status(500).json('Server Error ')
        }


});

router.post('/forget-password',[body('name', 'Enter Valid Name').isLength({min:3})],[body('email','Enter Valid Email').isEmail()], async (req,res)=>{

           const errors = validationResult(req); // Ekahne Validator er result display kora hoice
     if (!errors.isEmpty()) {
      return res.status(400).json({ faild: 'Something Went Wrong. Check Your Information', errors: errors.array() });
    }  
    const {email,name}= req.body;
    try{
        const user = await User.findOne({email});
        if(!user){return res.status(404).json({msg:'User Not Found'})};
         const data ={
        id:user.id
        }   
        const tokenReset = jwt.sign(data,JWT_SECRET_PASSWORD_RESET,{expiresIn:'15m'});
   
           await forgetEmail(email, name, tokenReset )
            res.status(200).json({Sucess:'Reset Link Sent to Your Email'})

    }catch(error){console.error(error.message);
        res.status(500).json('Server Error')
    }
});

router.get('/reset-password/:token', async(req,res)=>{
    const token = req.params.token;
    try{
        const verifi = jwt.verify(token,JWT_SECRET_PASSWORD_RESET);
        res.send(`
             <html>
        <head><title>Reset Password</title></head>
        <body style="font-family:Arial;text-align:center;margin-top:50px">
        <div style="border:2px solid black; display: grid; grid-template-columns:400px; justify-content:center; ">
          <h2>Reset Your Password</h2>
          <form action="/api/auth/reset-password/${token}" method="POST">
            <input style="height:50px; width:300px; border:solid; padding-left:10px; border-radius:20px; padding-right:10px;" type="password" name="password" placeholder="Enter new password" required />
            <button style="height: 50px; width: 120px; margin-top:30px; border-radius:20px; font-size: 20px; border:none; background:green; color:White" type="submit">Submit</button>
          </form>
          </div>
        </body>
      </html>
            `)
    }catch(error){console.error(error.message)
        res.status(400).send('Expried Link')
    }
});

router.post('/reset-password/:token', async(req,res)=>{
const token = req.params.token;
const {password} = req.body;
try{
    const verify = jwt.verify(token, JWT_SECRET_PASSWORD_RESET)
  const user = await User.findById(verify.id);
  if(!user){return res.status(400).send('User Not Found')}
  if(!password){return res.status(400).json('Password Is Required')}

  const salt = await bcrypt.genSalt(10)
  const SecPass = await bcrypt.hash(password,salt)
  user.password = SecPass;
  await user.save();
  res.status(200).send(` <html>
    <head>
      <title>Email Verified</title>
      <style>
        body {
          background: #f0f4f8;
          font-family: Arial;
          text-align: center;
          padding-top: 100px;
        }
        .card {
          display: inline-block;
          padding: 30px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        h1 { color: #28a745; }
      </style>
      <script>
        setTimeout(() => {
          window.location.href = "https://inotebook24.netlify.app/signin"; // বা তোমার client এর path
        }, 3000);
      </script>
    </head>
    <body>
      <div class="card">
        <h1>✅ Your Password Has Been Changed Successfully!</h1>
      </div>
    </body>
  </html>`)
}catch(error){console.error(error.message);
    res.status(400).send('Expired Link')
}


});


module.exports= router