const express = require("express");
const bodyParser = require("body-parser");
const Datastore = require("nedb");
const request = require("request");
const cors = require("cors");

//BASE DE DATOS

db_defense_spent_stats = new Datastore();
db_electricity_generation_stats = new Datastore();


//EXPRESS

const app = express();
const port = process.env.PORT || 8080;


//CORS

app.use(cors());

//BODY PARSER

app.use("/",express.static('public'));
app.use(bodyParser.json());


app.listen(port,()=>{
    console.log(`Server TRULY ready at port ${port}`);
}); 

console.log(`Servidor listo ${port}`);

//--------------------- API REST de Pablo Galán ---------------------
const defenseStatsAPIv1 = require("./src/back/defenseStatsAPI/v1/defense-spent-stats.js");
defenseStatsAPIv1.register(app,db_defense_spent_stats);

const defenseStatsAPIv2 = require("./src/back/defenseStatsAPI/v2/defense-spent-stats.js");
defenseStatsAPIv2.register(app);




//--------------------- API REST de Manuel González ---------------------
const electricity_generation_stats_APIv1 = require("./src/back/electricityStatsAPI/v1/electricity-generation-stats.js");
electricity_generation_stats_APIv1.register(app,db_electricity_generation_stats);
const electricity_generation_stats_APIv2 = require("./src/back/electricityStatsAPI/v2/electricity-generation-stats.js");
electricity_generation_stats_APIv2.register(app);























//--------------------- Parte opcional Bruno Alvaro Rico Barrilero ---------------------
const BASE_API_URL = "/api/v1";
//Array de objetos


const BASE_API_URL_DEVELOPEMENT_INDICATORS = "/api/v1/developement-indicators-stats";


var developement_indicators_stats = [ 
    { 
        country: "spain",
        year: 2011,
        military_spending_in_porcentage_of_gpd : 1.33187655521014,
        annual_gdp_growth: -0.81437345515107,
        high_tech_products_exports: 6.59 
    },
    {
        country: "spain",
        year: 2012,
        military_spending_in_porcentage_of_gpd : 1.423637303,
        annual_gdp_growth: -2.95944130173555,
        high_tech_products_exports: 7.24990802040879},    
    { 
        country: "germany",
        year: 2011 ,
        military_spending_in_porcentage_of_gpd : 1.206150336,
        annual_gdp_growth: 3.92519270463411,
        high_tech_products_exports: 16.3375426942735},
    {
        country: "germany",
        year: 2012,
        military_spending_in_porcentage_of_gpd : 1.24167747904608,
        annual_gdp_growth: 0.418497594217598,
        high_tech_products_exports: 17.2215381656985
    }];



//Portal de Documentacion

app.get(BASE_API_URL_DEVELOPEMENT_INDICATORS+"/docs",(req,res)=>
{
    res.redirect("https://documenter.getpostman.com/view/14869400/UVyrVwp8");
});


//Cargar Datos Iniciales

app.get(BASE_API_URL_DEVELOPEMENT_INDICATORS +"/loadInitialData",(req,res)=>{

    if(developement_indicators_stats.length==0){
        var developement_indicators_stats = [ 
            { 
                country: "spain",
                year: 2011,
                military_spending_in_porcentage_of_gpd : 1.33187655521014,
                annual_gdp_growth: -0.81437345515107,
                high_tech_products_exports: 6.59 
            },
            {
                country: "spain",
                year: 2012,
                military_spending_in_porcentage_of_gpd : 1.423637303,
                annual_gdp_growth: -2.95944130173555,
                high_tech_products_exports: 7.24990802040879
            },    
            { 
                country: "germany",
                year: 2011 ,
                military_spending_in_porcentage_of_gpd : 1.206150336,
                annual_gdp_growth: 3.92519270463411,
                high_tech_products_exports: 16.3375426942735
            },
            {
                country: "germany",
                year: 2012,
                military_spending_in_porcentage_of_gpd : 1.24167747904608,
                annual_gdp_growth: 0.418497594217598,
                high_tech_products_exports: 17.2215381656985
            }];

            res.sendStatus(200,"OK");
        }


});

//Metodo auxiliar

function check_body_DI(req){
    return (req.body.country == null |
             req.body.year == null | 
             req.body.military_spending_in_porcentage_of_gpd == null | 
             req.body.annual_gdp_growth == null | 
             req.body.high_tech_products_exports == null);
}

//GETs

//GET Global y años

app.get(BASE_API_URL_DEVELOPEMENT_INDICATORS,(req,res)=>{
    var year = req.query.year;
    var from = req.query.from;
    var to   = req.query.to;

    if(year!=null){
        //Busqueda por año

        var filteredList = developement_indicators_stats.filter((reg)=>{
            return (reg.year == year);
        });

        if(filteredList==0){
            res.sendStatus(404, "NOT FOUND");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }
    }else if (from !=null && to !=null){
        //Busqueda para from y  to

        var filteredList = developement_indicators_stats.filter((reg)=>
        {
            return (reg.year >= from && reg.year <=to);
        });
        if (filteredList==0){
            res.sendStatus(404, "NOT FOUND");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }

    }else if(year == null && from == null && to == null){
        res.send(JSON.stringify(developement_indicators_stats,null,2));
    }else{
        res.sendStatus(400, "BAD REQUEST");
    }

});

//GET Pais

app.get(BASE_API_URL_DEVELOPEMENT_INDICATORS+"/:country",(req, res)=>{

    var country =req.params.country
    var filteredList = developement_indicators_stats.filter((reg)=>
    {
        return (reg.country == country);
    });

    var from = req.query.from;
    var to = req.query.to;

    if(from != null && to != null){
        // Apartado para from y to
        filteredList = filteredList.filter((reg)=>
        {
            return (reg.year >= from && reg.year <=to);
        });
        if (filteredList==0){
            res.sendStatus(404, "NOT FOUND");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }

    }else{
        if (filteredList==0){
            res.sendStatus(404, "NO EXISTE");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }
    }

});

//GET por Pais y Año

app.get(BASE_API_URL_DEVELOPEMENT_INDICATORS+"/:country/:year",(req, res)=>{

    var country =req.params.country
    var year = req.params.year
    var filteredList = developement_indicators_stats.filter((reg)=>
    {
        return (reg.country == country && reg.year == year);
    });
    if (filteredList==0){
        res.sendStatus(404, "NOT FOUND");
    }else{
        res.send(JSON.stringify(filteredList,null,2));
    }
});



//POSTs

//POST resources list

app.post(BASE_API_URL_DEVELOPEMENT_INDICATORS,(req, res)=>{
    
    if(check_body_DI(req)){
        res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
    }else{
        
        //Comprobamos que no existe ya el dato
        var filteredList = developement_indicators_stats.filter((reg)=>
        {
            return(req.body.country == reg.country && req.body.year == reg.year)
        })
    
        if(filteredList.length != 0){
            res.sendStatus(409,"CONFLICT");
        }else{
            developement_indicators_stats.push(req.body);
            res.sendStatus(201,"CREATED");
        }
    }

});
developement_indicators_stats.findIndex

// POST para recurso concreto

app.post(BASE_API_URL_DEVELOPEMENT_INDICATORS +"/:country",(req, res)=>{
    res.sendStatus(405,"METHOD NOT ALLOWED");
});

//PUTs

// PUT de una lista de recursos

app.put(BASE_API_URL_DEVELOPEMENT_INDICATORS,(req, res)=>{
    
    res.sendStatus(405,"METHOD NOT ALLOWED");
});

// PUT de un recurso especifico

app.put(BASE_API_URL_DEVELOPEMENT_INDICATORS +"/:country/:year",(req, res)=>{
    
    if(check_body_DI(req)){
        res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
    }else{
        var country = req.params.country;
        var year = req.params.year;
        var body = req.body;  

        //Usamos un index para poder localizar el elemento en concreto dentro del array
        var index = developement_indicators_stats.findIndex((reg) =>{
            return (reg.country == country && reg.year == year)
        });
        if(index == null){
            res.sendStatus(404,"NOT FOUND");
        }else if(country != body.country || year != body.year){
            res.sendStatus(400,"BAD REQUEST");
        }else{
            var  update_developement_indicators_stat = {...body};
            developement_indicators_stats[index] = update_developement_indicators_stat;
        
            res.sendStatus(200,"UPDATED");
        }
    }

});

// DELETEs

// DELETE de una lista de recursos

app.delete(BASE_API_URL_DEVELOPEMENT_INDICATORS,(req, res)=>{
    developement_indicators_stats = [];
    res.sendStatus(200,"DELETED");
});

// DELETE de un recurso especifico

app.delete(BASE_API_URL_DEVELOPEMENT_INDICATORS+"/:country/:year",(req, res)=>{
    var country = req.params.country;
    var year = req.params.year;
    developement_indicators_stats = developement_indicators_stats.filter((reg)=>{
 
        // Con la primera parte comprobamos si es un país distinto al seleccionado
        // y con la segunda en caso de ser el mismo país se comprueba si es el mismo año
        return (reg.country!=country || (reg.country == country && reg.year != year))
    })
    res.sendStatus(200,"DELETED");
});






