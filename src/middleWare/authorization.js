module.exports =(...role)=>{
    return (req, res, next)=>{
     try {
        const userRole= req.user.role;
        if(!role.includes(userRole)){
          return res.json({
              status:"failed",
              message:"You are not authorized."
          })
        }
        next()
     } catch (error) {
        res.json({
            status:"Internal server error"
        })
     }
    }
}