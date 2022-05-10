<script>

import { pop }from "svelte-spa-router";
import Button from "sveltestrap/src/Button.svelte";

const BASE_DEFENSE_PATH = "/api/v2/defense-spent-stats";
const BASE_ELECTRICITY_PATH = "/api/v2/electricity-generation-stats";

/*---- Datos Defensa ----*/

let defenseData = [];
let defenseChartInfo = [];
let defenseChartVar = [];

/*---- Datos Electricidad ----*/

let electricityData = [];
let electricityChartInfo = [];
let electricityChartVar = [];

async function loadGraph(){
        console.log("Fetching graphic data...");

        /*-----Const por API-----*/
        
        const resDefense = await fetch(BASE_DEFENSE_PATH);
        const resElectricity = await fetch(BASE_ELECTRICITY_PATH);

        /*-----Inicializamos los datos-----*/

        defenseData = await resDefense.json();
        electricityData = await resElectricity.json();

        console.log("procesing all data....");

        if((resDefense || resElectricity) == 0){
            console.log("ERROR MSG");
            alert("Por favor, primero cargue los datos de alguna API");
            pop();
        }

        /*-----Condiciones para cada API medidos por % VAR-----*/

        //DEFENSE API

        if(resDefense.ok){
            defenseData.forEach(stat => {
                if(stat.year == 2019){
                    defenseChartInfo.push(stat.country+"/"+stat.year);
                    defenseChartVar.push(stat["var"]);
                }
            });
        }

        //ELECTRICTITY API

        if(resElectricity.ok){
            electricityData.forEach()(stat => {
                if(stat.year == 2019){
                    electricityChartInfo.push(stat.country+"/"+stat.year);
                    electricityChartVar.push(stat["var"]);
                }
            });
        }
        console.log("vamos por aqui....");

        if(defenseChartInfo.length == 0 && electricityChartInfo.length == 0){
            console.log("ERROR MSG");
            alert("Por favor primero cargue los datos en al menos una de las APIs");
            pop();
        }

         /*-----Declaración de Gráfica conjunta-----*/
        
        console.log("Generando datos...");
        Highcharts.chart('container', {
            chart: {
                type: 'line'
            },
            title: {
                text: 'Gráfica conjunta por Países'
            },
            xAxis: {  
                allowDecimals: false,
                title: {
                    text: 'País/año'
                },
                categories: defenseChartInfo,
            },
            yAxis: {
                title: {
                    text: 'Variación'
                },
            },
            series: [{
                name: ' Variacion en Gasto en Defensa',
                data: defenseChartVar
            }, {
                name: 'Variación en Consumo de Electricidad',
                data: electricityChartVar
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        });

    }

</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"  on:load="{loadGraph}"></script>    
</svelte:head>



<main>

  <figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
      Gráfico en el que se representa la variacion en Gasto en Defensa y Consumo de Electricidad en el año 2019
    </p>
  </figure>

  <p align="center"><Button outline color="secondary" on:click="{pop}">Atrás</Button></p>
 
</main>
