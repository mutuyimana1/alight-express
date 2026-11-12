import bcrypt from "bcrypt"

const hashPassword =(passsword)=>{
   return bcrypt.hash(passsword,10)
}

const comparePassword=(password,hashedPassword)=>{
   return bcrypt.compare(password,hashedPassword)
}

export {hashPassword,comparePassword}