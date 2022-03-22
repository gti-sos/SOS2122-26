const cool = require("cool-ascii-faces");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8080;

app.use("/",express.static('public'));
app.use(bodyParser.json());

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
    { country: "spain", year: 2020 , spen_mill_eur : 15730.3 , public_percent: 2.66, pib_percent: 1.40, per_capita: 332, var: 4.46 },

    { country: "spain", year: 2019, spen_mill_eur : 15384.60 , public_percent: 2.94, pib_percent: 1.23, per_capita: 326, var: -4.37 },
    
    { country: "alemania" , year: 2020 , spen_mill_eur : 47136.7 ,  public_percent: 2.60 , pib_percent: 1.40 , per_capita: 567, var: 8.91 },

    {country: "alemania" , year: 2019, spen_mill_eur : 43773.50 , public_percent: 2.81 , pib_percent: 1.27 , per_capita: 527, var: 5.61 }];


//GET

app.get(BASE_API_URL+ "/defense_spent_stats", (req,res)=>{
    res.send(JSON.stringify(defense_spent_stats,null,2));
});


//POST

app.post(BASE_API_URL+ "/defense_spent_stats", (req,res)=>{
    defense_spent_stats.push(req.body);
    res.sendStatus(201, "CREATED");
});

//--------------------- Parte opcional Manu Gonzalez ---------------------

//Array de objetos

var electricity_generation_stats = [ 
    {country:"spain",year:2021,installed_capacity_mw:110287,generation_gwh:519699,renovable_inst_cap_mw:55492,renovable_gen_gwh:121305,renovable_percentage:23.32,var:1.32},
{country:"alemania",year:2020,installed_capacity_mw:230418,generation_gwh:545205,renovable_inst_cap_mw:131399,renovable_gen_gwh:264851,renovable_percentage:48.58,var:5.15}
]
    
//GET

app.get(BASE_API_URL+ "/electricity-generation-stats", (req,res)=>{
    res.send(JSON.stringify(electricity_generation_stats,null,2));
});


//POST

app.post(BASE_API_URL+ "/electricity-generation-stats", (req,res)=>{
    electricity_generation_stats.push(req.body);
    res.sendStatus(201, "CREATED");
});

//--------------------- Parte opcional Bruno Alvaro Rico Barrilero ---------------------

//Array de objetos

var developement_indicators_stats = [ 
    { country: "spain", year: 2011 , military_spending_in_porcentage_of_gpd : 1.33187655521014,
     annual_gdp_growth: -0.81437345515107, high_tech_products_exports: 6.59 },

    { country: "spain", year: 2012, military_spending_in_porcentage_of_gpd : 1.423637303 ,
     annual_gdp_growth: -2.95944130173555, high_tech_products_exports: 7.24990802040879},
    
    { country: "germany" , year: 2011 , military_spending_in_porcentage_of_gpd : 1.206150336 ,
     annual_gdp_growth: 3.92519270463411 , high_tech_products_exports: 16.3375426942735},

    {country: "germany" , year: 2012, military_spending_in_porcentage_of_gpd : 1.24167747904608 ,
     annual_gdp_growth: 0.418497594217598 , high_tech_products_exports: 17.2215381656985 }];


//GET

app.get(BASE_API_URL+ "developement-indicators-stats", (req,res)=>{
    res.send(JSON.stringify(developement-indicators-stats,null,2));
});


//POST

app.post(BASE_API_URL+ "developement-indicators-stats", (req,res)=>{
    developement-indicators-stats.push(req.body);
    res.sendStatus(201, "CREATED");
});

