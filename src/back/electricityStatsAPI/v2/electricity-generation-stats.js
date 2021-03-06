var Datastore = require("nedb");
var db = new Datastore();
var BASE_API_PATH = "/api/v2/electricity-generation-stats";
const request = require("request");

var electricityStats = [];

/* Variables exteriores para instegraciones */

var extPathV1 = "/externalAPIV1";
var extApiServerHostV1 =
  "https://sos2122-27.herokuapp.com/api/v2/smi_stats";

// var extPathV3 = "/remoteAPIV3";
// var extApiServerHostV3 =
//   "https://countriesnow.space/api/v0.1/countries/population/cities";

// var extPathV4="/remoteAPIV4";
// var extApiServerHostV4 = "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/europe?rapidapi-key=16a223c8b0msh4bfbfb189f95a0dp1822e1jsnfbfe42809539";

module.exports.register = (app) => {
  //Integraciones

  app.use(extPathV1, function (req, res) {
    var url = extApiServerHostV1 + req.url;
    console.log("piped: " + req.baseUrl + req.url);
    req.pipe(request(url)).pipe(res);
  });


  // app.use(extPathV3, function (req, res) {
  //   var url = extApiServerHostV3 + req.url;
  //   console.log("piped: " + req.baseUrl + req.url);
  //   req.pipe(request(url)).pipe(res);
  // });

  //Portal de Documentacion

  app.get(BASE_API_PATH + "/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/17956919/UVysxbKW");
  });

  db.insert(electricityStats);

  //Constructor

  //GET inicial (loadInitialData) para inicializar la BD (constructor)

  app.get(BASE_API_PATH + "/loadInitialData", (req, res) => {
    electricity_generation_statsIni = [
      {
        country: "spain",
        year: 2020,
        installed_capacity_mw: 110287,
        generation_gwh: 502797,
        renovable_inst_cap_mw: 55492,
        renovable_gen_gwh: 110605,
        renovable_percentage: 22.0,
        var: 3.23,
      },
      {
        country: "spain",
        year: 2019,
        installed_capacity_mw: 110360,
        generation_gwh: 521658,
        renovable_inst_cap_mw: 55333,
        renovable_gen_gwh: 97913,
        renovable_percentage: 18.77,
        var: -19.68,
      },
      {
        country: "germany",
        year: 2020,
        installed_capacity_mw: 230418,
        generation_gwh: 545205,
        renovable_inst_cap_mw: 131399,
        renovable_gen_gwh: 264851,
        renovable_percentage: 48.58,
        var: 5.15,
      },
      {
        country: "germany",
        year: 2019,
        installed_capacity_mw: 230418,
        generation_gwh: 577444,
        renovable_inst_cap_mw: 126251,
        renovable_gen_gwh: 250802,
        renovable_percentage: 43.43,
        var: 5.24,
      },
      {
        country: "france",
        year: 2020,
        installed_capacity_mw: 137082,
        generation_gwh: 553714,
        renovable_inst_cap_mw: 51613,
        renovable_gen_gwh: 131197,
        renovable_percentage: 23.69,
        var: 2.38,
      },
      {
        country: "france",
        year: 2019,
        installed_capacity_mw: 137082,
        generation_gwh: 545014,
        renovable_inst_cap_mw: 48533,
        renovable_gen_gwh: 116141,
        renovable_percentage: 21.31,
        var: 0.28,
      },

      {
        country: "italy",
        year: 2020,
        installed_capacity_mw: 115462,
        generation_gwh: 271877,
        renovable_inst_cap_mw: 52473,
        renovable_gen_gwh: 120165,
        renovable_percentage: 44.2,
        var: 2.52,
      },
      {
        country: "portugal",
        year: 2020,
        installed_capacity_mw: 22210,
        generation_gwh: 52222,
        renovable_inst_cap_mw: 11384,
        renovable_gen_gwh: 32160,
        renovable_percentage: 61.58,
        var: 7.08,
      },
      {
        country: "japan",
        year: 2020,
        installed_capacity_mw: 306759,
        generation_gwh: 888995,
        renovable_inst_cap_mw: 95936,
        renovable_gen_gwh: 193470,
        renovable_percentage: 21.76,
        var: 2.08,
      },
      {
        country: "china",
        year: 2020,
        installed_capacity_mw: 2217925,
        generation_gwh: 7601217,
        renovable_inst_cap_mw: 893737,
        renovable_gen_gwh: 2220492,
        renovable_percentage: 29.21,
        var: 1.45,
      },
      {
        country: "united states",
        year: 2020,
        installed_capacity_mw: 1143266,
        generation_gwh: 4048658,
        renovable_inst_cap_mw: 292543,
        renovable_gen_gwh: 837381,
        renovable_percentage: 20.68,
        var: 2.02,
      },
      {
        country: "greece",
        year: 2020,
        installed_capacity_mw: 21545,
        generation_gwh: 40572,
        renovable_inst_cap_mw: 10198,
        renovable_gen_gwh: 17670,
        renovable_percentage: 43.55,
        var: 6.57,
      },

      {
        country: "italy",
        year: 2019,
        installed_capacity_mw: 115462,
        generation_gwh: 283008,
        renovable_inst_cap_mw: 52117,
        renovable_gen_gwh: 117946,
        renovable_percentage: 41.68,
        var: -0.52,
      },
      {
        country: "portugal",
        year: 2019,
        installed_capacity_mw: 22210,
        generation_gwh: 50480,
        renovable_inst_cap_mw: 11366,
        renovable_gen_gwh: 27514,
        renovable_percentage: 54.5,
        var: 1.91,
      },

      {
        country: "japan",
        year: 2019,
        installed_capacity_mw: 306759,
        generation_gwh: 947793,
        renovable_inst_cap_mw: 91832,
        renovable_gen_gwh: 186484,
        renovable_percentage: 19.68,
        var: 1.15,
      },
      {
        country: "china",
        year: 2019,
        installed_capacity_mw: 2023604,
        generation_gwh: 7224896,
        renovable_inst_cap_mw: 757246,
        renovable_gen_gwh: 2005877,
        renovable_percentage: 27.76,
        var: 0.8,
      },
      {
        country: "united states",
        year: 2019,
        installed_capacity_mw: 1122323,
        generation_gwh: 4162813,
        renovable_inst_cap_mw: 262301,
        renovable_gen_gwh: 776961,
        renovable_percentage: 18.66,
        var: 0.4,
      },
      {
        country: "greece",
        year: 2019,
        installed_capacity_mw: 20607,
        generation_gwh: 44260,
        renovable_inst_cap_mw: 9264,
        renovable_gen_gwh: 16368,
        renovable_percentage: 36.98,
        var: 5.72,
      },
      {
        country: "australia",
        year: 2020,
        installed_capacity_mw: 82517,
        generation_gwh: 243309,
        renovable_inst_cap_mw: 35421,
        renovable_gen_gwh: 59927,
        renovable_percentage: 24.63,
        var: 3.99,
      },

      {
        country: "australia",
        year: 2019,
        installed_capacity_mw: 75540,
        generation_gwh: 249996,
        renovable_inst_cap_mw: 27174,
        renovable_gen_gwh: 51591,
        renovable_percentage: 20.64,
        var: 3.0,
      },
    ];

    // Inicializaci??n base de datos
    //Borra todo lo anterior para evitar duplicidades al hacer loadInitialData
    db.remove({}, { multi: true }, function (err, numRemoved) {});

    // Inserta los datos iniciales en la base de datos
    db.insert(electricity_generation_statsIni);

    res.send(JSON.stringify(electricity_generation_statsIni, null, 2));
  });

  /*------------------- GETs -------------------*/

  //GET A UNA LISTA DE RECURSOS DE ELECTRICITY-STATS
  app.get(BASE_API_PATH, (req, res) => {
    var query = req.query;
    var limit = parseInt(query.limit);
    var offset = parseInt(query.offset);
    var dbquery = {};

    //"Parseamos" los datos a su tipo original antes de buscar
    if (req.query.country) dbquery["country"] = req.query.country;
    if (req.query.year) dbquery["year"] = parseInt(req.query.year);
    if (req.query.installed_capacity_mw)
      dbquery["installed_capacity_mw"] = parseInt(
        req.query.installed_capacity_mw
      );
    if (req.query.generation_gwh)
      dbquery["generation_gwh"] = parseInt(req.query.generation_gwh);
    if (req.query.renovable_inst_cap_mw)
      dbquery["renovable_inst_cap_mw"] = parseInt(
        req.query.renovable_inst_cap_mw
      );
    if (req.query.renovable_gen_gwh)
      dbquery["renovable_gen_gwh"] = parseInt(req.query.renovable_gen_gwh);
    if (req.query.renovable_percentage)
      dbquery["renovable_percentage"] = parseFloat(
        req.query.renovable_percentage
      );
    if (req.query.var) dbquery["var"] = parseFloat(req.query.var);

    //B??squeda de datos y ordenaci??n por parametro country
    db.find(dbquery)
      .sort({ country: 1, year: -1 })
      .skip(offset)
      .limit(limit)
      .exec((error, dataElectricity) => {
        if (error) {
          console.error("Error accessing DB in POST: " + err);
          res.sendStatus(500);
        } else {
          //Se elimina el _id creado autom??ticamente
          dataElectricity.forEach((t) => {
            delete t._id;
          });

          res.send(JSON.stringify(dataElectricity, null, 2));
          console.log("GET REQUEST have been sent.");
        }
      });
  });

  //GET A UN RECURSO CONCRETO DE ELEC. POR COUNTRY/YEAR
  app.get(BASE_API_PATH + "/:country/:year", (req, res) => {
    var reqCountry = req.params.country;
    var reqYear = parseInt(req.params.year);

    db.find(
      { country: reqCountry, year: reqYear },
      { _id: 0 },
      function (err, data) {
        if (err) {
          console.error("ERROR in GET: " + err);
          res.sendStatus(500);
        } else {
          if (data.length != 0) {
            console.log(`NEW GET request to <${reqCountry}>, <${reqYear}>`);
            res.status(200).send(JSON.stringify(data, null, 2));
          } else {
            console.error("Data not found");
            res.status(404).send("Data not found in DB.");
          }
        }
      }
    );
  });

  /*------------------- POSTs -------------------*/

  //POST A LA LISTA DE RECURSOS DE ELECTRICITY-STATS
  app.post(BASE_API_PATH, (req, res) => {
    var dataNew = req.body;
    var countryNew = req.body.country;
    var yearNew = req.body.year;

    db.find({ country: countryNew, year: yearNew }, (err, data) => {
      if (err) {
        console.error("Error accessing DB in POST: " + err);
        res.sendStatus(500);
      } else {
        if (data.length == 0) {
          if (
            !dataNew.country ||
            !dataNew.year ||
            !dataNew.installed_capacity_mw ||
            !dataNew.generation_gwh ||
            !dataNew.renovable_inst_cap_mw ||
            !dataNew.renovable_gen_gwh ||
            !dataNew.renovable_percentage ||
            !dataNew.var
          ) {
            console.log("Number of parameters is incorrect.");
            return res.status(400).send("Format incorrect.");
          } else {
            console.log(
              "Inserting new data in DB: " + JSON.stringify(dataNew, null, 2)
            );
            db.insert(dataNew);
            return res
              .status(201)
              .send(
                "Se ha creado correctamente: " +
                  JSON.stringify(dataNew, null, 2)
              );
          }
        } else {
          console.log("Conflit is detected.");
          res.sendStatus(409);
        }
      }
    });
  });

  //POST A UN RECURSO DE ELECTRICITY (No est?? permitido)
  app.post(BASE_API_PATH + "/:country/:year", (req, res) => {
    res.sendStatus(405);
    console.log("Se ha intentado hacer POST a un recurso concreto.");
  });

  /*------------------- PUTs -------------------*/

  //PUT A UN RECURSO CONCRETO DE ELECTRICITY POR COUNTRY/YEAR
  app.put(BASE_API_PATH + "/:country/:year", (req, res) => {
    var reqcountry = req.params.country;
    var reqyear = parseInt(req.params.year);
    var data = req.body;

    if (Object.keys(data).length != 8) {
      console.log("Actualizacion de campos no valida");
      res.sendStatus(400);
    } else if (check_body(req)) {
      res.sendStatus(400, "BAD REQUEST - Parametros incorrectos");
    } else {
      db.update(
        { country: reqcountry, year: reqyear },
        { $set: data },
        {},
        function (err, dataUpdate) {
          if (err) {
            console.error("ERROR accesing DB in GET");
            res.sendStatus(500);
          } else {
            if (dataUpdate == 0) {
              console.error("No data found");
              res.sendStatus(404);
            } else {
              console.log("Campos actualizados");
              res.sendStatus(200);
            }
          }
        }
      );
    }
  });

  //PUT A UNA LISTA DE RECURSOS DE ELECTRICITY STATS (Debe dar error)
  app.put(BASE_API_PATH, (req, res) => {
    res.sendStatus(405);
  });

  /*------------------- DELETEs -------------------*/

  //DELETE A LISTA DE RECURSOS DE ELECTRICITY STATS
  app.delete(BASE_API_PATH, (req, res) => {
    db.remove({}, { multi: true }, (err, numDataRemoved) => {
      if (err || numDataRemoved == 0) {
        console.log("ERROR deleting DB: " + err);
        res.sendStatus(500);
      } else {
        console.log(
          numDataRemoved + " has been successfully deleted from the BD."
        );
        res.sendStatus(200);
      }
    });
  });

  //DELETE A UN RECURSO DE ELECTRICITY POR COUNTRY/YEAR
  app.delete(BASE_API_PATH + "/:country/:year", (req, res) => {
    var reqcountry = req.params.country;
    var reqyear = parseInt(req.params.year);
    db.remove(
      { country: reqcountry, year: reqyear },
      { multi: true },
      (err, data) => {
        if (err) {
          console.error("ERROR in GET");
          res.sendStatus(500);
        } else {
          if (data != 0) {
            console.log(`NEW DELETE request to <${reqcountry}>, <${reqyear}>`);
            res
              .status(200)
              .send(
                "The corresponding data for " +
                  reqcountry +
                  " and " +
                  reqyear +
                  " has been deleted"
              );
          } else {
            console.log("Data not found");
            res.sendStatus(404);
          }
        }
      }
    );
  });
  /*-------------------F-AUX-------------------*/

  function check_body(req) {
    return (
      (req.body.country == null) |
      (req.body.year == null) |
      (req.body.installed_capacity_mw == null) |
      (req.body.generation_gwh == null) |
      (req.body.renovable_inst_cap_mw == null) |
      (req.body.renovable_gen_gwh == null) |
      (req.body.renovable_percentage == null) |
      (req.body.var == null)
    );
  }
};
