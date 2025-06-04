const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.MY_SUPER_SCECRET_CODE;
const verification=(req,res,next)=>{
    
// jwt token theke user ante hobe verification er jonno ei verification process 
// complete hole user tar data gulo dekhte parbe


//cookeis based verification middlewear 
//const token = req/cookies.token // eita use korte hobe.

const token = req.header('auth-token');
if(!token){return res.status(401).send({error:'Please Use Your Valid Token'})}
try{
const data = jwt.verify(token,JWT_SECRET)

req.user = data
    next()
} catch (error){
     res.status(401).send({error:'Please Use Your Valid Token'})
    console.error(error.massage)
}

}
module.exports=verification;