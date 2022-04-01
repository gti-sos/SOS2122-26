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


const BASE_API_URL = "/api/v1";




//--------------------- Parte opcional Pablo Galán ---------------------

//Array de objetos
const BASE_API_URL_DEFENSE = "/api/v1/defense-spent-stats";

var defense_spent_stats = [ 
    { country: "spain", year: 2020 , spen_mill_eur : 15730.3 , public_percent: 2.66, pib_percent: 1.40, per_capita: 332, var: 4.46 },

    { country: "spain", year: 2019, spen_mill_eur : 15384.60 , public_percent: 2.94, pib_percent: 1.23, per_capita: 326, var: -4.37 },
    
    { country: "germany" , year: 2020 , spen_mill_eur : 47136.7 ,  public_percent: 2.60 , pib_percent: 1.40 , per_capita: 567, var: 8.91 },

    {country: "germany" , year: 2019, spen_mill_eur : 43773.50 , public_percent: 2.81 , pib_percent: 1.27 , per_capita: 527, var: 5.61 },

    {country: "france" , year: 2020, spen_mill_eur : 47745.7 , public_percent: 3.29 , pib_percent: 2.07 , per_capita: 704, var: 7.82 },

    {country: "france" , year: 2019, spen_mill_eur : 44986.30 , public_percent: 3.32 , pib_percent: 1.85 , per_capita: 665, var: -2.37 }
];

//Portal de Documentacion

app.get(BASE_API_URL_DEFENSE+"/docs",(req,res)=>
{
    res.redirect("https://documenter.getpostman.com/view/19481608/UVsSLhi1");
});



//Cargar Datos Iniciales

app.get(BASE_API_URL_DEFENSE+"/loadInitialData",(req,res)=>{

    if(defense_spent_stats.length==0){
        defense_spent_stats = [
    { country: "spain", year: 2020 , spen_mill_eur : 15730.3 , public_percent: 2.66, pib_percent: 1.40, per_capita: 332, var: 4.46 },

    { country: "spain", year: 2019, spen_mill_eur : 15384.60 , public_percent: 2.94, pib_percent: 1.23, per_capita: 326, var: -4.37 },
    
    { country: "germany" , year: 2020 , spen_mill_eur : 47136.7 ,  public_percent: 2.60 , pib_percent: 1.40 , per_capita: 567, var: 8.91 },

    {country: "germany" , year: 2019, spen_mill_eur : 43773.50 , public_percent: 2.81 , pib_percent: 1.27 , per_capita: 527, var: 5.61 },

    {country: "france" , year: 2020, spen_mill_eur : 47745.7 , public_percent: 3.29 , pib_percent: 2.07 , per_capita: 704, var: 7.82 },

    {country: "france" , year: 2019, spen_mill_eur : 44986.30 , public_percent: 3.32 , pib_percent: 1.85 , per_capita: 665, var: -2.37 }
    ];}

    res.sendStatus(200,"OK");


});




//Metodo auxiliar

function check_body(req){
    return (req.body.country == null |
             req.body.year == null | 
             req.body.spen_mill_eur == null | 
             req.body.public_percent == null | 
             req.body.pib_percent == null |
             req.body.per_capita == null |
             req.body.var == null);
}



//GETs

//GET Global y años

app.get(BASE_API_URL_DEFENSE,(req,res)=>{
    var year = req.query.year;
    var from = req.query.from;
    var to   = req.query.to;

    if(year!=null){
        //Busqueda por año

        var filteredList = defense_spent_stats.filter((reg)=>{
            return (reg.year == year);
        });

        if(filteredList==0){
            res.sendStatus(404, "NOT FOUND");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }
    }else if (from !=null && to !=null){
        //Busqueda para from y  to

        var filteredList = defense_spent_stats.filter((reg)=>
        {
            return (reg.year >= from && reg.year <=to);
        });
        if (filteredList==0){
            res.sendStatus(404, "NOT FOUND");
        }else{
            res.send(JSON.stringify(filteredList,null,2));
        }

    }else if(year == null && from == null && to == null){
        res.send(JSON.stringify(defense_spent_stats,null,2));
    }else{
        res.sendStatus(400, "BAD REQUEST");
    }

});

//GET Pais

app.get(BASE_API_URL_DEFENSE+"/:country",(req, res)=>{

    var country =req.params.country
    var filteredList = defense_spent_stats.filter((reg)=>
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

app.get(BASE_API_URL_DEFENSE+"/:country/:year",(req, res)=>{

    var country =req.params.country
    var year = req.params.year
    var filteredList = defense_spent_stats.filter((reg)=>
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

app.post(BASE_API_URL_DEFENSE,(req, res)=>{
    
    if(check_body(req)){
        res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
    }else{
        
        //Comprobamos que no existe ya el dato
        var filteredList = defense_spent_stats.filter((reg)=>
        {
            return(req.body.country == reg.country && req.body.year == reg.year)
        })
    
        if(filteredList.length != 0){
            res.sendStatus(409,"CONFLICT");
        }else{
            defense_spent_stats.push(req.body);
            res.sendStatus(201,"CREATED");
        }
    }

});
defense_spent_stats.findIndex
// POST para recurso concreto

app.post(BASE_API_URL_DEFENSE+"/:country",(req, res)=>{
    res.sendStatus(405,"METHOD NOT ALLOWED");
});


//PUTs

// PUT de una lista de recursos

app.put(BASE_API_URL_DEFENSE,(req, res)=>{
    
    res.sendStatus(405,"METHOD NOT ALLOWED");
});

// PUT de un recurso especifico

app.put(BASE_API_URL_DEFENSE+"/:country/:year",(req, res)=>{
    
    if(check_body(req)){
        res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
    }else{
        var country = req.params.country;
        var year = req.params.year;
        var body = req.body;  

        //Usamos un index para poder localizar el elemento en concreto dentro del array
        var index = defense_spent_stats.findIndex((reg) =>{
            return (reg.country == country && reg.year == year)
        });
        if(index == null){
            res.sendStatus(404,"NOT FOUND");
        }else if(country != body.country || year != body.year){
            res.sendStatus(400,"BAD REQUEST");
        }else{
            var  update_defense_spent_stat = {...body};
            defense_spent_stats[index] = update_defense_spent_stat;
        
            res.sendStatus(200,"UPDATED");
        }
    }

});

// DELETEs

// DELETE de una lista de recursos

app.delete(BASE_API_URL_DEFENSE,(req, res)=>{
    defense_spent_stats = [];
    res.sendStatus(200,"DELETED");
});

// DELETE de un recurso especifico

app.delete(BASE_API_URL_DEFENSE+"/:country/:year",(req, res)=>{
    var country = req.params.country;
    var year = req.params.year;
    defense_spent_stats = defense_spent_stats.filter((reg)=>{
 
        // Con la primera parte comprobamos si es un país distinto al seleccionado
        // y con la segunda en caso de ser el mismo país se comprueba si es el mismo año
        return (reg.country!=country || (reg.country == country && reg.year != year))
    })
    res.sendStatus(200,"DELETED");
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

            res.sendStatus(200,"OK");
        }

    res.sendStatus(200,"OK");


});

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
    
    if(check_body(req)){
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
    
    if(check_body(req)){
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






