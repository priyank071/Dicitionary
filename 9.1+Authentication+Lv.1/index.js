import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt, { hash } from "bcrypt";
const app = express();
const port = 4000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Secrets",
  password: "base@admin24",
  port: 5432,
});
db.connect();
let currentUser=0;
const saltRounds=10;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
    const email=req.body.username;
    const pass=req.body.password;
    try{
    const checkEmail=await db.query("SELECT* FROM users WHERE email=($1)",[email]);
    if(checkEmail.rows.length >0){
        res.send("user already exist");
    }
    else{
      bcrypt.hash(pass,saltRounds, async(err,hash)=>{
         if(err){
          console.log(err);
         }
         else{
          const result=await db.query("INSERT INTO users(email,password) VALUES( $1 , $2 ) RETURNING *;",[email,hash]);
          const id = result.rows[0].id;
          currentUserId = id;
          res.render("data.ejs");
         }
      })
    }
    }
    catch(err){
        console.log(err);
    }
});

app.post("/login", async (req, res) => {
    const email=req.body.username;
    const pass=req.body.password;
    try{
      const checkEmail=await db.query("SELECT* FROM users WHERE email=($1)",[email]);
      if(checkEmail.rows.length >0){
        const user=checkEmail.rows[0];
        const passW=user.passwords;
        bcrypt.compare(pass,passW,(err,result)=>{
          if(err){
            console.log(err);
          }
          if(result){
            const id = checkEmail.rows[0].id;
            currentUserId = id;
            res.render("data.ejs");
          }
          else{
            res.send("wrong password");
          }
        })
      }
      else{
          res.send("This user is not valid"); 
      }
      }
      catch(err){
          console.log(err);
      }
});
app.post("/add",async(req,res)=>{
  const website=req.body.website
  const username=req.body.username
  const password=req.body.password
  db.query("INSERT INTO userdata(website,username,password,user_id) VALUES($1,$2,$3,$4)",[website,username,password,currentUser])
  
})
app.get("/data",async(req,res)=>{
  const result=await db.query("SELECT* FROM userdata");
  const rows=result.rows;
  res.render("data.ejs",{
   data:rows
  })
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
