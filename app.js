import express from "express";
import { shortenerRoutes } from "./routes/shortener.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { getLoginPage } from "./controllers/auth.controller.js";
import { getShortenerPage } from "./controllers/postshortener.controller.js";


const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views")

//? In Express.js, a template engine is a tool that lets you embed dynamic content into HTML files and render them on the server before sending them to the client. It allows you to create reusable templates, making it easier to generate dynamic web pages with minimal code.
// app.get("/login",
//   getShortenerPage
// )
app.use("/user",authRouter)
app.use(shortenerRoutes);
// console.log(shortenerRoutes.stack)

// console.log(authRouter.stack)

// express router
// app.use(router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
