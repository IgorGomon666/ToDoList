// const User = require('../models/User')

// module.exports.login = function(req,res){
//     res.status(200).json({
//         message:"login"
//     })
// }

// module.exports.register = function(req,res){
//     const user = new User({
//         name: req.body.name,
//         password: req.body.password
//     })
//     user.save()
//         .catch(error=>{
//             res.status(404).json(error)
//         })
//         .then(console.log(`User ${req.body.name} created`))
        
// }