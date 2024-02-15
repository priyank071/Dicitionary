import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const app=express();
const port=3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
var userIsAuthorised = false;
app.use(bodyParser.urlencoded({ extended: true }));
const validUsername = 'priyanka'; 
const validPassword = 'pri'; 
app.use(express.static("public"));
app.get("/data",(req,res)=>{
    res.sendFile(__dirname + "/public/data.html");
})
app.get("/temp",(req,res)=>{
    res.sendFile(__dirname+"/public/home.html");
})
app.get("/generator",(req,res)=>{
    res.sendFile(__dirname+"/public/generator.html");
})
app.post("/home", (req, res) => {
    const data=req.body;
    if(data.password===validPassword && data.username===validUsername){
        res.sendFile(__dirname+"/public/home.html");
    }
    else{
        res.sendFile(__dirname + "/public/index.html");
    }
});
app.get("/main",(req,res)=>{
    res.sendFile(__dirname+"/public/home.html");
})
app.get("/",(req,res)=>{
    res.sendFile(__dirname +"/public/index.html");
})
app.listen(port,()=>{
    console.log(`Server start at port no ${port}`);
})
