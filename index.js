const cool = require("cool-ascii-faces");
const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

app.arguments("/"express.static('public'))

app.get("/faces",(req,res)=>{
    console.log("requested / route")
    res.send("<html><body><h1>"+cool()+"</h1></body></html>")
});

app.listen(port,()=>{
    console.log(`Server TRULY ready at port ${port}`);
}); 
console.log(`Servidor listo ${port}`);