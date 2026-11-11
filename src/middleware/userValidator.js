import {body, validationResult} from 'express-validator';

export const userValidations=[
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("userName").isLength({min:4, max:10}).withMessage("useName should be btn 4 and 10 characters"),
    body("email").trim().isEmail().withMessage("Please provide valid email").normalizeEmail(),
   body("password").notEmpty().withMessage("password is required") 
   .isStrongPassword({
    minUppercase:1,
    minSymbols:1
   }).withMessage("Password should be strong with at least 1 uppercase and 1 symbol"),
    body("role").isIn(["user","admin"]).withMessage("Role should be either user or admin")
]

export const validateUser=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
return res.status(400).json({
    success:false,
    errors:errors.array().map(err=>err.msg)
})
    }
    next()
}