const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15*60*1000, max: 5, msg: 'Too many login attempts from this IP, please try again after 15 minutes',

    standardHeaders: true, lagacyHeaders: false,
})

module.exports=loginLimiter