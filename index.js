const express = require("express");
const hbs = require("hbs");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const { log } = require("console");

const app = express();
const encoder = bodyParser.urlencoded();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    tls: true,
    auth:{
        user:"", // Add here your email id
        pass: "" // Add here the app password for your email id
    }
})

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
    res.render("contact",{show: false})
})
app.post("/contact",encoder, (req,res)=>{
    let mailOptions = {
        from : "", // Add here the mail id from which you want to send the confirmation mail
        to: req.body.email,
        subject: "Confirmation: Industro",
        text: `
                Hello ${req.body.name},
                Your query has been received. Our team will connect your shortly!

                Regards,
                Team Industro 
                `
    }
    transporter.sendMail(mailOptions, (error)=>{
        console.log(error);
    })
    mailOptions = {
        from : "",  // Add your email id 
        to: "", // Add your email id i.e. the same mail id so that you can also get a confirmation mail
        subject: "Query received : Industro",
        html: `
                <h3>Hi</h3>
                <h3>Please find below the details of the query: </h3>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>${req.body.name}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>${req.body.email}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>${req.body.phone}</td>
                        </tr>
                        <tr>
                            <th>Subject</th>
                            <td>${req.body.subject}</td>
                        </tr>
                        <tr>
                            <th>Message</th>
                            <td>${req.body.message}</td>
                        </tr>
                    </tbody>
                </table>
        `
    }
    transporter.sendMail(mailOptions, (error)=>{
        console.log(error);
    })
    res.render("contact",{show: true})
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
app.get("/*",(req,res)=>{
    res.render("404")
})

app.listen(8000, ()=>console.log('Server is running at http://localhost:8000'))