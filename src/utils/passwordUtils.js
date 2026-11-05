import bcrypt from "bcrypt"

function hashPassword (passsword){
   return bcrypt.hash(passsword,10)
}

export default hashPassword
