import { verifyJWT } from "../services/auth.services.js";

export const verifyAuthentication=(req,res,next)=>{
    const token=req.cookies.access_token;
    // console.log(req.cookies.access_token)
    if(!token){
        req.user=null
        return next()
    }
    // console.log("here")
    const decodedToken=verifyJWT(token);
    try{
        req.user=decodedToken
        // console.log(`req.user ${ JSON.stringify(req.user, null, 2)}`)
    }
    catch(e){
        req.user=null
        
    }
    return next()
}