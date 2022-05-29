var Datastore = require("nedb");
var db = new Datastore();
var BASE_API_PATH = "/api/v2/defense-spent-stats"; 
const request = require("request");

var defenseStats = [];


/* Variables exteriores para instegraciones */

var extPathV1="/remoteAPIV1";
var extApiServerHostV1 ="https://sos2122-27.herokuapp.com/api/v2/public-debt-stats";

var extPathV2="/remoteAPIV2";
var extApiServerHostV2 ="http://sos2122-10.herokuapp.com/api/v2/population-levels";

var extPathV3="/remoteAPIV3";
var extApiServerHostV3 = "https://countriesnow.space/api/v0.1/countries/population/cities";


module.exports.register = (app) => {

    //Integraciones

    app.use(extPathV1, function(req, res) {
        var url = extApiServerHostV1 + req.url;
        console.log('piped: ' + req.baseUrl + req.url);
        req.pipe(request(url)).pipe(res);
    });

    app.use(extPathV2, function(req, res) {
        var url = extApiServerHostV2 + req.url;
        console.log('piped: ' + req.baseUrl + req.url);
        req.pipe(request(url)).pipe(res);
    });

    app.use(extPathV3, function(req, res) {
        var url = extApiServerHostV3 + req.url;
        console.log('piped: ' + req.baseUrl + req.url);
        req.pipe(request(url)).pipe(res);
    });

    
    //Portal de Documentacion

    app.get(BASE_API_PATH+"/docs",(req,res)=>
    {
        res.redirect("https://documenter.getpostman.com/view/19481608/UVyswFmx");
    });

    db.insert(defenseStats);

    //Constructor

     //GET inicial (loadInitialData) para inicializar la BD (constructor)

     app.get(BASE_API_PATH+"/loadInitialData",(req,res)=>{

        defense_spent_statsIni = [ 
            
            { country: "spain", year: 2020 , spen_mill_eur : 15730.3 , public_percent: 2.66, pib_percent: 1.40, per_capita: 332, var: 4.46 },
        
            { country: "spain", year: 2019, spen_mill_eur : 15384.60 , public_percent: 2.94, pib_percent: 1.23, per_capita: 326, var: -4.37 },
            
            { country: "germany" , year: 2020 , spen_mill_eur : 47136.7 ,  public_percent: 2.60 , pib_percent: 1.40 , per_capita: 567, var: 8.91 },
        
            {country: "germany" , year: 2019, spen_mill_eur : 43773.50 , public_percent: 2.81 , pib_percent: 1.27 , per_capita: 527, var: 5.61 },
        
            {country: "france" , year: 2020, spen_mill_eur : 47745.7 , public_percent: 3.29 , pib_percent: 2.07 , per_capita: 704, var: 7.82 },
        
            {country: "france" , year: 2019, spen_mill_eur : 44986.30 , public_percent: 3.32 , pib_percent: 1.85 , per_capita: 665, var: -2.37 },

            {country: "italy" , year: 2020, spen_mill_eur : 22844.0 , public_percent: 2.42 , pib_percent: 1.38 , per_capita: 384 , var: 12.98 },

            {country: "italy" , year: 2019, spen_mill_eur : 21142.7 , public_percent: 2.43 , pib_percent: 1.18 , per_capita: 354 , var: -7.04 },

            {country: "portugal" , year: 2020, spen_mill_eur : 3362.3 , public_percent: 3.41 , pib_percent: 1.66 , per_capita: 327 , var: 10.68 },

            {country: "portugal" , year: 2019, spen_mill_eur : 3042.4 , public_percent: 3.34 , pib_percent: 1.42 , per_capita: 296 , var: 1.18 },

            {country: "greece" , year: 2019, spen_mill_eur : 4320.2 , public_percent: 4.92 , pib_percent: 2.36 , per_capita: 403 , var: -4.91 },

            {country: "greece" , year: 2020, spen_mill_eur : 4837.0 , public_percent: 4.89 , pib_percent: 2.92 , per_capita: 451 , var: -3.25 },

            {country: "japan" , year: 2019, spen_mill_eur : 42903.3 , public_percent: 2.49 , pib_percent: 0.94 , per_capita: 340 , var: 2.42 },

            {country: "japan" , year: 2020, spen_mill_eur : 44025.2 , public_percent: 2.07 , pib_percent: 1.00 , per_capita: 350 , var: 5.82 },

            {country: "china" , year: 2019, spen_mill_eur : 221323.1 , public_percent: 4.91 , pib_percent: 1.73 , per_capita: 157 , var: 2.56 },

            {country: "china" , year: 2020, spen_mill_eur : 225756.9 , public_percent: 4.69 , pib_percent: 1.75 , per_capita: 160 , var: 4.81 },
            
            {country: "united states" , year: 2019, spen_mill_eur : 654270.7 , public_percent: 9.59 , pib_percent: 3.43 , per_capita: 1991 , var: 7.10 },

            {country: "united states" , year: 2020, spen_mill_eur : 684351.9 , public_percent: 7.93 , pib_percent: 3.74 , per_capita: 2066 , var: 5.85 },

            {country: "australia" , year: 2019, spen_mill_eur : 23114.5 , public_percent: 4.89 , pib_percent: 1.88 , per_capita: 904  , var: -4.18 },

            {country: "australia" , year: 2020, spen_mill_eur : 25767.9 , public_percent: 4.64 , pib_percent: 2.06 , per_capita: 1003 , var: 6.91 },

            {country: "bangladesh" , year: 2020, spen_mill_eur : 3690.5 , public_percent: 9.31 , pib_percent: 1.31 , per_capita: 22 , var: 2.04 },

            {country: "albania" , year: 2020, spen_mill_eur : 204.0 , public_percent: 4.67 , pib_percent: 1.54 , per_capita: 72 , var: 17.21 },

            {country: "barbados" , year: 2020, spen_mill_eur : 8.8 , public_percent: 1.47 , pib_percent: 0.59 , per_capita: 16 , var: 2.95 },
            
            {country: "gabon" , year: 2020, spen_mill_eur : 237.2 , public_percent: 8.47 , pib_percent: 1.76 , per_capita: 107 , var: -1.08 }
        ];

        // Inicialización base de datos
        //Borra todo lo anterior para evitar duplicidades al hacer loadInitialData
        db.remove({}, { multi: true }, function (err, numRemoved) {
        });

        // Inserta los datos iniciales en la base de datos
        db.insert(defense_spent_statsIni);

        res.send(JSON.stringify(defense_spent_statsIni,null,2));


    });

    /*------------------- GETs -------------------*/


     //GET A UNA LISTA DE RECURSOS DE DEFENSE-STATS
    app.get(BASE_API_PATH, (req,res)=>{
        var query = req.query;
        var limit = parseInt(query.limit);
        var offset = parseInt(query.offset);
        var dbquery = {};

        //"Parseamos" los datos a su tipo original antes de buscar
        if (req.query.country) dbquery["country"] = req.query.country;
        if (req.query.year) dbquery["year"] = parseInt(req.query.year);
        if (req.query.spen_mill_eur) dbquery["spen_mill_eur"] = parseFloat(req.query.spen_mill_eur);
        if (req.query.pib_percent) dbquery["pib_percent"] = parseFloat(req.query.pib_percent);
        if (req.query.per_capita) dbquery["per_capita"] = parseFloat(req.query.per_capita);
        if (req.query.var) dbquery["var"] = parseFloat(req.query.var);

        //Búsqueda de datos y ordenación por parametro country
        db.find(dbquery).sort({country:1, year:-1}).skip(offset).limit(limit).exec((error, dataDefense) => {
            if (error){
                console.error("Error accessing DB in POST: " + err);
                res.sendStatus(500);
            }else {

            //Se elimina el _id creado automáticamente
            dataDefense.forEach((t) => {
                delete t._id
            });

            res.send(JSON.stringify(dataDefense, null, 2));
            console.log("GET REQUEST have been sent.");
            }
        });
    });


     //GET A UN RECURSO CONCRETO DE DEFENSE POR COUNTRY/YEAR    
     app.get(BASE_API_PATH+"/:country/:year", (req, res) => {
        var reqCountry = req.params.country;
        var reqYear = parseInt(req.params.year);

        db.find({ country: reqCountry, year: reqYear }, { _id: 0 }, function (err, data) {
            if (err) {
                console.error("ERROR in GET: "+err);
                res.sendStatus(500);
            } else {
                if(data.length != 0){                
                console.log(`NEW GET request to <${reqCountry}>, <${reqYear}>`);
                res.status(200).send(JSON.stringify(data,null,2));
                }else{
                    console.error("Data not found");
                    res.status(404).send("Data not found in DB.");
                }

            }
        });
    });

    /*------------------- POSTs -------------------*/


    //POST A LA LISTA DE RECURSOS DE DEFENSE-STATS 
    app.post(BASE_API_PATH,(req,res)=>{
        var dataNew = req.body;
        var countryNew = req.body.country;
        var yearNew = req.body.year;
        
        
        db.find({ country: countryNew, year: yearNew }, (err, data) => {
            if (err) {
                console.error("Error accessing DB in POST: " + err);
                res.sendStatus(500);
            } else {
                if (data.length == 0) {
                    if (!dataNew.country ||
                        !dataNew.year ||
                        !dataNew.spen_mill_eur ||
                        !dataNew.pib_percent ||
                        !dataNew.per_capita ||
                        !dataNew.var) {
                        console.log("Number of parameters is incorrect.");
                        return res.status(400).send("Format incorrect.");
                    }else {
                        console.log("Inserting new data in DB: " + JSON.stringify(dataNew, null, 2));
                        db.insert(dataNew);
                        return res.status(201).send("Se ha creado correctamente: " +JSON.stringify(dataNew, null, 2));
                    }
                } else {
                    console.log("Conflit is detected.");
                    res.sendStatus(409);
                }
            }
        });
    });

     //POST A UN RECURSO DE DEFENSE (No está permitido)
     app.post(BASE_API_PATH+"/:country/:year",(req,res)=>{
        res.sendStatus(405);
        console.log("Se ha intentado hacer POST a un recurso concreto.");
    });

    /*------------------- PUTs -------------------*/

     //PUT A UN RECURSO CONCRETO DE DEFENSE POR COUNTRY/YEAR
     app.put(BASE_API_PATH+"/:country/:year", (req,res) => {
        
        var reqcountry = req.params.country;
        var reqyear = parseInt(req.params.year);
        var data = req.body;
        
        if (Object.keys(data).length != 7) {
            console.log("Actualizacion de campos no valida");
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos");
        }
        else if(check_body(req)){
            res.sendStatus(400,"BAD REQUEST - Parametros incorrectos")
        }
        else {
            db.update({ country: reqcountry, year: reqyear }, { $set: data }, {}, function (err, dataUpdate) {
                if (err) {
                    console.error("ERROR accesing DB in GET");
                    res.sendStatus(500);
                } else {
                    if (dataUpdate == 0) {
                        console.error("No data found");
                        res.sendStatus(404);
                    } else {
                        console.log("Campos actualizados")
                        res.sendStatus(200);
                    }
                }
            });
        }
    });

     //PUT A UNA LISTA DE RECURSOS DE DEFENSEs STATS (Debe dar error)
     app.put(BASE_API_PATH,(req,res) => {
        res.sendStatus(405);
    });



    /*------------------- DELETEs -------------------*/


     //DELETE A LISTA DE RECURSOS DE DEFENSE STATS
     app.delete(BASE_API_PATH, (req,res) => {
        db.remove({}, {multi: true}, (err, numDataRemoved) => {
            if (err || numDataRemoved == 0){
                console.log("ERROR deleting DB: "+err);
                res.sendStatus(500);
            }else{
                console.log(numDataRemoved+" has been successfully deleted from the BD.");
                res.sendStatus(200);
            }
        });
    });

    //DELETE A UN RECURSO DE DEFENSE POR COUNTRY/YEAR
    app.delete(BASE_API_PATH + "/:country/:year", (req,res)=>{
        var reqcountry = req.params.country;
        var reqyear = parseInt(req.params.year);
        db.remove({country : reqcountry, year : reqyear},{multi:true}, (err, data) => {
            if (err) {
                console.error("ERROR in GET");
                res.sendStatus(500);
            } else {
                if(data != 0){
                    console.log(`NEW DELETE request to <${reqcountry}>, <${reqyear}>`);
                    res.status(200).send("The corresponding data for " + reqcountry + " and " + reqyear + " has been deleted");
                }else{
                    console.log("Data not found");
                    res.sendStatus(404);
                }
            }
        });
    });


    /*-------------------F-AUX-------------------*/

    function check_body(req){
        return (req.body.country == null |
                 req.body.year == null | 
                 req.body.spen_mill_eur == null | 
                 req.body.public_percent == null | 
                 req.body.pib_percent == null |
                 req.body.per_capita == null |
                 req.body.var == null);
    };

};