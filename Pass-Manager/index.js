import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt,{hash} from "bcrypt";

const saltRounds=10;
const db=new pg.Client({
    user:"postgres",
    host: "localhost",
    database: "pass-db",
    password: "base@admin24",
    port: 5432,
});
db.connect();
const app=express();
const port=5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId=0
//rendering home page......
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

//rendering register page.......
app.get("/register",(req,res)=>{
    res.render("register.ejs");
})

//rendering login page.......
app.get("/login",(req,res)=>{
    res.render("login.ejs");
})

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
          const result=await db.query("INSERT INTO users(email,passwords) VALUES( $1 , $2 ) RETURNING *;",[email,hash]);
          const id = result.rows[0].id;
          currentUserId = id;
          res.render("home.ejs");
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
            res.render("home.ejs");
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
app.get("/home",(req,res)=>{
  res.render("home.ejs");
})
app.post("/add",async(req,res)=>{
  const website=req.body.website
  const username=req.body.username
  const password=req.body.password
  try{
  await db.query("INSERT INTO usersdata(website,username,passwords,user_id) VALUES($1,$2,$3,$4)",[website,username,password,currentUserId])
  }
  catch(err){
    console.log(err);
  }
})
app.get("/pass",async(req,res)=>{
  try{
  const result=await db.query("SELECT* FROM usersdata WHERE user_id=($1)",[currentUserId]);
  const rows=result.rows;
  // console.log(rows);
  res.render("pass.ejs",{
   data:rows
  })
}
catch(err){
  console.log(err);
}
})


app.post("/remove", async(req, res) => {
  const item=req.body.deleteItemId;
  try {
    await db.query("DELETE FROM usersdata WHERE id=$1",[item]);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});
app.listen(port,()=>{
    console.log(`Server start at port no ${port}`);
})