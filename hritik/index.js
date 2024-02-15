import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const port=3000;
const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currAnswer=0
let img="";
let ques="";
let value=true
let Yesimage=["loveYou.gif"]
let Noimage=["no1.gif","no9.gif","nolast.gif"]

let noQuestion=["will you not be","hiii","idgng","hate you"]
app.post("/submit",(req,res)=>{
    const answer = req.body.answer;
    if(answer==="yes"){
        img=Yesimage[1];
        ques=""
    }
    else{
        img=Noimage[currAnswer]
        ques=noQuestion[currAnswer]
        console.log(currAnswer)
        currAnswer++;
    }
    res.render("index.ejs",{
        Image:img,
        question:ques
    })
})



app.get("/",(req,res)=>{
    res.render("index.ejs");
})
app.listen(port,()=>{
    console.log(`server start on port ${port}`);
})
