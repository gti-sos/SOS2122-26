const cool = require("cool-ascii-faces");
const express = require("express");

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.use("/",express.static('public'))

app.get("/cool",(req,res)=>{
    console.log("requested / route")
    res.send("<html><body><h1>"+cool()+"</h1></body></html>")
});

app.listen(port,()=>{
    console.log(`Server TRULY ready at port ${port}`);
}); 
console.log(`Servidor listo ${port}`);


//--------------------- Parte opcional Pablo Galán ---------------------

//Array de objetos
const BASE_API_URL = "/api/v1"

var defense_spent_stats = [ 
    { country: spain, year: 2020 , spen_mill_eur : 15730.3 , public_percent: 2.66, pib_percent: 1.40, per_capita: 332, var: 4.46 },

    { country: spain, year: 2019, spen_mill_eur : 15384.60 , public_percent: 2.94, pib_percent: 1.23, per_capita: 326, var: -4.37 },
    
    { country: alemania , year: 2020 , spen_mill_eur : 47136.7 ,  public_percent: 2.60 , pib_percent: 1.40 , per_capita: 567, var: 8.91 },

    {country: alemania , year: 2019, spen_mill_eur : 43773.50 , public_percent: 2.81 , pib_percent: 1.27 , per_capita: 527, var: 5.61 }];


//GET

app.get(BASE_API_URL+"/defense_spent_stats", (req,res)=>{
    res.send(JSON.stringify(defense_spent_stats,null,2));
});
 
app.get(BASE_API_URL+"/defense_spent_stats/:country", (req,res)=>{
    
    var defenseCountry = req.params.country;
    var filteredCountries = defense_spent_stats.filter((defense)=>{
        return (defense.country == defenseCountry);
    });

    if(filteredCountries.length == 0){
        res.sendStatus(404, "NOT FOUND");

    }else{
        res.send(JSON.stringify(filteredCountries, null, 2));
    }
});

//POST

app.post(BASE_API_URL+"/defense_spent_stats", (req,res)=>{
    defense_spent_stats.push(req.body);
    res.sendStatus(201, "CREATED");
});