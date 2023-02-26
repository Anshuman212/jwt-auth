const {BadRequestError} = require('../errors/bad-request');
const jwt = require('jsonwebtoken')


const login = async (req,res)=>{
    const {username,password}=req.body;
    console.log(username,password);
    //mongo, joi,check for empty
    if(!username || !password){
        throw new BadRequestError('please provide all email and password') 
    }
    //just for demo normally provided by the db!!
    const id = new Date().getDate();


    // try to keep payload small for better user experience
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})

    res.status(200).json({msg:"user created",token});
}
const dashboard  = async (req,res)=>{
    const luckyNumber = Math.floor(Math.random()*100);
    res.status(200).json({msg:`testing the jwt-auth ${decode.username}`,secret:`secret token test ${luckyNumber}`});
  
}
module.exports = {
    login,
    dashboard
}