const bodyParser = require("body-parser");
const res = require("express/lib/response");
const BASE_API_URL_DEFENSE = "/api/v1/defense-spent-stats";


//Array de objetos

var defense_spent_stats = [ 
    { country: "spain", year: 2020 , spen_mill_eur : 15730.3 , public_percent: 2.66, pib_percent: 1.40, per_capita: 332, var: 4.46 },

    { country: "spain", year: 2019, spen_mill_eur : 15384.60 , public_percent: 2.94, pib_percent: 1.23, per_capita: 326, var: -4.37 },
    
    { country: "germany" , year: 2020 , spen_mill_eur : 47136.7 ,  public_percent: 2.60 , pib_percent: 1.40 , per_capita: 567, var: 8.91 },

    {country: "germany" , year: 2019, spen_mill_eur : 43773.50 , public_percent: 2.81 , pib_percent: 1.27 , per_capita: 527, var: 5.61 },

    {country: "france" , year: 2020, spen_mill_eur : 47745.7 , public_percent: 3.29 , pib_percent: 2.07 , per_capita: 704, var: 7.82 },

    {country: "france" , year: 2019, spen_mill_eur : 44986.30 , public_percent: 3.32 , pib_percent: 1.85 , per_capita: 665, var: -2.37 }
];


module.exports.register = (app,db) => {

//Portal de Documentacion

app.get(BASE_API_URL_DEFENSE+"/docs",(req,res)=>
{
    res.redirect("https://documenter.getpostman.com/view/19481608/UVyswFmx");
});



//Cargar Datos Iniciales

app.get(BASE_API_URL_DEFENSE+"/loadInitialData",(req,res)=>{

    db.find({}, function(err,filteredList){

        if(err){
            res.sendStatus(500, "CLIENT ERROR");
        
        }
        if(filteredList==0){
            for(var i = 0; i<defense_spent_stats.length;i++){
                db.insert(defense_spent_stats[i]);
            }
            res.sendStatus(200,"OK");
            
        }
    });

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
};

function pagination(req, lista){

    var res = [];
    const limit = req.query.limit;
    const offset = req.query.offset;
    
    if(limit < 1 || offset < 0 || offset > lista.length){
        res.push("ERROR EN PARAMETROS LIMIT Y/O OFFSET");
        return res;
    }

    res = lista.slice(offset,parseInt(limit)+parseInt(offset));
    return res;

};



//GETs

//GET Global y años

app.get(BASE_API_URL_DEFENSE,(req,res)=>{
    var year = req.query.year;
    var from = req.query.from;
    var to   = req.query.to;

    //Comprobaciones
    //Comprobacion query 

    for(var i = 0; i<Object.keys(req.query).length;i++){
        var element = Object.keys(req.query)[i];
        if(element != "year" && element != "from" && element != "to" && element != "limit" && element != "offset"){
            res.sendStatus(400, "BAD REQUEST");
            
        }
    }
    
    //Comprobacion from menor que to

    if(from>to){
        res.sendStatus(400, "BAD REQUEST");
        
    }

    db.find({},function(err, filteredList){

        if(err){
            res.sendStatus(500, "CLIENT ERROR");   
        }

        // Apartado para búsqueda por año
        
        if(year != null){
            var filteredList = filteredList.filter((reg)=>
            {
                return (reg.year == year);
            });
            if (filteredList==0){
                res.sendStatus(404, "NOT FOUND");     
            }
        }

        // Apartado para from y to
        
        if(from != null && to != null){
            filteredList = filteredList.filter((reg)=>
            {
                return (reg.year >= from && reg.year <=to);
            });

            if (filteredList==0){
                res.sendStatus(404, "NOT FOUND");
            }    

            
        }
        // RESULTADO

        if(req.query.limit != undefined || req.query.offset != undefined){
            filteredList = pagination(req,filteredList);
        }
        filteredList.forEach((element)=>{
            delete element._id;
        });
        res.send(JSON.stringify(filteredList,null,2));
    });
    
  

});

//GET Pais y opcion entre años

app.get(BASE_API_URL_DEFENSE+"/:country",(req, res)=>{

    var country =req.params.country
    var from = req.query.from;
    var to = req.query.to;

    //Comprobaciones
    //Comprobaciones query
    
    for(var i = 0; i<Object.keys(req.query).length;i++){
        var element = Object.keys(req.query)[i];
        if(element != "from" && element != "to"){
            res.sendStatus(400, "BAD REQUEST");
            return;
        }
    }

     //Comprobacion from menor que to

     if(from>to){
        res.sendStatus(400, "BAD REQUEST");
        
    }

    db.find({}, function(err,filteredList){
            
        if(err){
            res.sendStatus(500, "CLIENT ERROR");
            return;
        }

        filteredList = filteredList.filter((reg)=>
        {
            return (reg.country == country);
        });


        if(from != null && to != null && from<=to){
            filteredList = filteredList.filter((reg)=>
            {
               return (reg.year >= from && reg.year <=to);
            }); 
            
        }
        //COMPROBAMOS SI EXISTE
        if (filteredList==0){
            res.sendStatus(404, "NOT FOUND");
            return;
        }
        //RESULTADO
        if(req.query.limit != undefined || req.query.offset != undefined){
            filteredList = pagination(req,filteredList);
        }
        filteredList.forEach((element)=>{
            delete element._id;
        });
        res.send(JSON.stringify(filteredList,null,2));
    });

});


//GET por Pais y Año

app.get(BASE_API_URL_DEFENSE+"/:country/:year",(req, res)=>{

    var country =req.params.country
    var year = req.params.year

    db.find({},function(err, filteredList){

        if(err){
            res.sendStatus(500, "ERROR EN CLIENTE");
            
        }

        filteredList = filteredList.filter((reg)=>
        {
            return (reg.country == country && reg.year == year);
        });
        if (filteredList==0){
            res.sendStatus(404, "NO EXISTE");
            
        }

        //RESULTADO

        //Paginación
        if(req.query.limit != undefined || req.query.offset != undefined){
            filteredList = pagination(req,filteredList);
            res.send(JSON.stringify(filteredList,null,2));
        }
        filteredList.forEach((element)=>{
            delete element._id;
        });
        res.send(JSON.stringify(filteredList[0],null,2));
    });

});

//POSTs

//POST resources list

app.post(BASE_API_URL_DEFENSE,(req, res)=>{
    
    //Comprobamos formato JSON
    if(check_body(req)){
        res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
    }else{
        db.find({},function(err,filteredList){

            if(err){
                res.sendStatus(500, "CLIENT ERROR");
               
            }

            filteredList = filteredList.filter((reg)=>
            {
                return(req.body.country == reg.country && req.body.year == reg.year)
            })
        
            if(filteredList.length != 0){
                res.sendStatus(409,"CONFLICT");
            }else{
                db.insert(req.body);
                res.sendStatus(201,"CREATED");
            }
        });
    }

});
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
    
    //Comprobamos formato JSON
    if(check_body(req)){
        res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
    }
    var countryR = req.params.country;
    var yearR = req.params.year;
    var body = req.body;  

    db.find({},function(err,filteredList){
            if(err){
                res.sendStatus(500, "CLIENT ERROR");
                return;
            }

            //COMPROBAMOS SI EXISTE EL ELEMENTO

            filteredList = filteredList.filter((reg)=>
            {
                return (reg.country == countryR && reg.year == yearR);
            });
            if (filteredList==0){
                res.sendStatus(404, "NOT FOUND");
                return;
            }

            //COMPROBAMOS SI LOS CAMPOS ACTUALIZADOS SON IGUALES

            if(countryR != body.country || yearR != body.year){
                res.sendStatus(400,"BAD REQUEST");
                return;
            }

            //ACTUALIZAMOS VALOR
                
            db.update({$and:[{country: String(countryR)}, {year: parseInt(yearR)}]}, {$set: body}, {},function(err, numUpdated) {
                if (err) {
                    res.sendStatus(500, "CLIENT ERROR");
                    return;
                }else{
                    res.sendStatus(200,"UPDATED");
                    return;
                }
            });
    });   
    

});

// DELETEs

// DELETE de una lista de recursos

app.delete(BASE_API_URL_DEFENSE,(req, res)=>{
    db.remove({}, { multi: true }, (err, numRemoved)=>{
        if (err){
            res.sendStatus(500,"CLIENT ERROR");
            
        }
        res.sendStatus(200,"DELETED");
        
    });
});

// DELETE de un recurso especifico

app.delete(BASE_API_URL_DEFENSE+"/:country/:year",(req, res)=>{
    var countryR = req.params.country;
    var yearR = req.params.year;
    db.find({country: countryR, year: parseInt(yearR)}, {}, (err, filteredList)=>{
        if (err){
            res.sendStatus(500,"ERROR EN CLIENTE");
            return;
        }
        if(filteredList==0){
            res.sendStatus(404,"NOT FOUND");
            return;
        }
        db.remove({country: countryR, year: yearR}, {}, (err, numRemoved)=>{
            if (err){
                res.sendStatus(500,"ERROR EN CLIENTE");
                return;
            }
        
            res.sendStatus(200,"DELETED");
            return;
            
        });
    });
});

};