import {  getUserbyEmail, hashPassword, insertUser, verifyPassword } from "../services/shortener.services.js"

export const getLoginPage=(req,res)=>{
  console.log('Login page hit')
     return res.render('auth/login')
}
export const getRegisterPage=(req,res)=>{
  return res.render("auth/register")
}

export const postLoginPage = async(req, res) => {
  // res.setHeader("Set-Cookie", "isLoggedIn=true; path=/;");
  const {email,password}=req.body
  const [userExists]=await getUserbyEmail(email)
  if(!userExists) return res.redirect('/user/login')
  const isUserValid=await verifyPassword(password,userExists.password)
  if (!isUserValid) {
    res.redirect("/user/login")
  }
  res.cookie("isLoggedIn", true);
  res.redirect("/");
};
export const postRegisterPage = async(req, res) => {
  console.log(req.body)
  const {name,email,password}=req.body
  const [userExists]=await getUserbyEmail(email)
  // console.log(userExists)
  if(userExists) return res.redirect('/user/register')
  const hashedPassword=await hashPassword(password)
console.log(hashedPassword)
  const user=await insertUser({name,email,hashedPassword})
  console.log(user)
  res.redirect("/user/login");
};