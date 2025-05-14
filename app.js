import express from "express";
import { shortenerRoutes } from "./routes/shortener.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { verifyAuthentication } from "./middlewares/verify-auth-jwt.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cookieParser())
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views")
app.use(verifyAuthentication)
app.use((req,res,next)=>{
  res.locals.user=req.user
  return next()
})
app.use("/user",authRouter)
app.use(shortenerRoutes);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
