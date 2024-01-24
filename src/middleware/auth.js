const jwt = require('jsonwebtoken');
require('dotenv').config();


const userAuth = (req,res,next) =>{
    
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).send({message: "Missing authorization header"});
    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, process.env.APP_SECRET, (err,decoded) => {
        
        if (err) {
            console.log(err);
            return res.status(401).send({ message: "Invalid token" });
        } 

        
        req.body.owner = decoded.email;
        next();
    });

}
module.exports = userAuth;