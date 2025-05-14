import jwt from "jsonwebtoken"
export const generateToken=async ({id,name,email}) => {
    return  jwt.sign({id,name,email},process.env.JWT_SECRET_KEY,{
        expiresIn:"30d"
    })
}
export const verifyJWT=(token)=>{
    return jwt.verify(token,process.env.JWT_SECRET_KEY)
}