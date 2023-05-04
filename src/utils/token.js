const jwt = require("jsonwebtoken")

exports.generateToken=(userInfo)=>{
 const payload ={
    email: userInfo.email,
    role: userInfo.status,
 }
 const token = jwt.sign(payload, process.env.TOKEN,{
    expiresIn:"5 days"
 })
 return token
}