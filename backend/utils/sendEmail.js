
const signupConfirmTemp = require('./signupConfimTemp');
const {Resend}=require('resend')
const resend = new Resend(process.env.EMAIL_VERIFICATION_API)
const APIURI=process.env.BACKEND_URI_KEY
 const sendEmail = async (email, name,jwtToken)=>{
const verificationLink= `${APIURI}/api/auth/verification/${jwtToken}`
    try{
        const {data, error }= await resend.emails.send({
            from:'onboarding@resend.dev',
            to: email,
            subject:'Verifiy Your Email',
            html: signupConfirmTemp(name, verificationLink)
        });
       
       if (error) {
      console.error("Email send error:", error);
      return false;
    }
    return true;

     }catch (err) {
    console.error("Unexpected error:", err);
    return false;
  
  }
};
module.exports = sendEmail