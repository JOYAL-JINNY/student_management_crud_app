const express = require("express");//calling  server package or dependencies
const exphbs = require("express-handlebars");//template engine handler
const bodyparser = require("body-parser");//for handle the obtained json format content 
const mysql = require("mysql2");//connect with mysql server
const bodyParser = require("body-parser");


require ('dotenv').config();//to store constant for database connectivity

const app = express();//package object= app
const port = process.env.PORT || 5000;//choosing port


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static("public"));//for using external css or html files

const handlebars =exphbs.create({extname:".hbs"})//telling template extension
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");

/*const con=mysql.createPool({
    connectionLimit:10, 
    host :process.env.DB_HOST,
    user :process.env.DB_USER,
    password :process.env.DB_PASS,
    database :process.env.DB_NAME
});
con.getConnection((err,connection)=>{
    if(err) throw err
    console.log("connection success")
});
*/

/*
app.get('/',(req,res)=>{
    res.render("home")//for rendering home.hbs if there
})*/
const route = require("./server/router/student")
app.use('/',route)

app.listen(port,()=>{
    console.log("listening port:"+port);
})//understand server running or not
//nodemon used for automatic refreshing and saving changes
