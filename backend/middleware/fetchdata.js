const jwt = require('jsonwebtoken');

const JMT_SECRET = "bhaveshravto$le" 

const fetchdata = (req, res , next) =>{
const token = req.header("auth-token");
if(!token){
res.status(401).send({error : "Invalid token"});
}

try {
    const data =jwt.verify(token ,JMT_SECRET) 
 req.user = data.user
 
    next();
} catch (error) {
    console.error(error.message)
    res.status(401).send({error : "Invalid token"});
}
 
}

module.exports = fetchdata;