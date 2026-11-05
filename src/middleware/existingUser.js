import User from "../models/userModel.js"

async function userExist (req,res,next){
   const existingUser=await User.findOne({email:req.body.email});
      if(existingUser){
          return res.status(400).json({
              status:false,
              message:"User already exists"
          })
      }
      
      return next()
}
export default userExist

// function routerBodyValidation(schema){
//     async (req,res,next)=>{
//         try {
//             const {error}= schema.validate(req.body,{abortEarly:false})
//             if(error){
//                 const validationErrors =error.details.map((err)=>({
//                     feild:err.path[0],
//                     message:err.message.replace(/"/g,'')
//                 }))

//                 return res.status(400).json({
//                     success: false,
//                     message: "Validation failed",
//                     errors: validationErrors 
//                 })

//             }
//             return next()
//         } catch (error) {
            
//         }
//     }
// }


// export const signinSchema = Joi.object({
//   email: Joi.string().email().required().messages({
//     'any.required': 'Email is required',
//     'string.email': 'Email must be a valid email address',
//     'string.base': 'Email should be a text field',
//     'string.empty': 'Email cannot be empty',
//   }),
//   password: Joi.string()
//     .required()
//     .min(8)
//     .max(10)
//     .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/)
//     .messages({
//       'string.base': 'Password should be a text field',  
//       'string.empty': 'Password cannot be empty',
//       'string.min': 'Password must have at least 8 characters',
//       'string.max': 'Password cannot exceed 10 characters',
//       'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character', // KOSORA HANO
//       'any.required': 'Password is required',
//     }),
// });
