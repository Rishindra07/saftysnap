const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 60*1000,
    max:60,
    handler:(req,res)=>{
        return res.status(429).json({
            error:{
                code:"RATE_LIMIT",message:"Too many requests, slow down."
            },
        });
    },
});

module.exports = limiter;