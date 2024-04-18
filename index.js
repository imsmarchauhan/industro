const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");

app.set('view engine', "hbs");
app.use(express.static("public"));

hbs.registerPartials(path.join(__dirname,"views/partials"))

app.get("",(req, res)=>{
    res.render("index")
})

app.get("/about",(req,res)=>{
    res.render("about")
})

app.get("/contact",(req,res)=>{
    res.render("contact")
})
app.get("/feature",(req,res)=>{
    res.render("feature")
})
app.get("/project",(req,res)=>{
    res.render("project")
})
app.get("/service",(req,res)=>{
    res.render("service")
})
app.get("/team",(req,res)=>{
    res.render("team")
})
app.get("/testimonial",(req,res)=>{
    res.render("testimonial")
})

app.listen(8000, ()=>console.log('Server is running at http://localhost:8000'))