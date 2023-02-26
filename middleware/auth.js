const {unAuthenticError} = require('../errors');
const jwt = require('jsonwebtoken')



const authenticationMiddleware = async (req,res,next)=>{
    console.log(req.headers)
    const authHead = req.headers.authorization;
    if(!authHead || !authHead.startsWith('Bearer ')){
        throw new unAuthenticError('No token provided')
    }
    const token = authHead.split(' ')[1]; // taking out the second value after splitting on the basis of space as it is Authorization : Bearer token
    console.log(token); 
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
      const {id,username} = decode;
      req.user = {id,username};
      next();
    } catch (error) {
        throw new unAuthenticError('Not authorized to access this route' )
    }
    

}
module.exports = authenticationMiddleware