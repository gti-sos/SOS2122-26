<script>

import { pop }from "svelte-spa-router";
import Button from "sveltestrap/src/Button.svelte";
import {onMount} from 'svelte';

const BASE_DEFENSE_PATH = "/api/v2/defense-spent-stats";
const BASE_ELECTRICITY_PATH = "/api/v2/electricity-generation-stats";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/*---- Datos Defensa ----*/

let defenseData = [];
let defenseChartInfo = [];
let defenseChartVar = [];

/*---- Datos Electricidad ----*/

let electricityData = [];
let electricityChartInfo = [];
let electricityChartVar = [];

async function loadStats(){
        console.log("Fetching graphic data...");

        /*-----Const por API-----*/
        await fetch(BASE_DEFENSE_PATH + "/loadInitialData");
        const resDefense = await fetch(BASE_DEFENSE_PATH);
        await fetch(BASE_ELECTRICITY_PATH + "/loadInitialData");
        const resElectricity = await fetch(BASE_ELECTRICITY_PATH);


        /*-----Inicializamos los datos-----*/
        if (resDefense.ok&&resElectricity.ok){

            defenseData = await resDefense.json();
            defenseData.sort((a,b) => a.country.localeCompare(b.country));
            defenseData.forEach(stat => {
                if(stat.year == 2019){
                    defenseChartInfo.push(stat.country+"/"+stat.year);
                    defenseChartVar.push(stat["var"]);
                }
            });

            electricityData = await resElectricity.json();
            electricityData.sort((a,b) => a.country.localeCompare(b.country));
            electricityData.forEach(stat => {
                if(stat.year == 2019){
                    electricityChartInfo.push(stat.country+"/"+stat.year);
                    electricityChartVar.push(stat["var"]);
                }
            });

            console.log(defenseChartInfo);
            console.log(electricityChartInfo);

            await delay(2000);

            /*-----Declaración de Gráfica conjunta-----*/

            loadGraph()

        }else{
            console.log("Error al cargar las apis");
        }
    }

    async function loadGraph(){

        console.log("Cargando gráfica");

        Highcharts.chart('container', {
                chart: {
                    type: 'column'
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
                    name: 'Variación en Producción de Electricidad',
                    data: electricityChartVar
                }]
            });
    }
    onMount(loadStats);



</script>

<svelte:head>

    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>

</svelte:head>


<main>

  <figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
      Gráfico en el que se representa la variacion en Gasto en Defensa y Producción de Electricidad en el año 2019
    </p>
  </figure>

  <p align="center"><Button outline color="secondary" on:click="{pop}">Atrás</Button></p>
 
</main>

<style>
        .highcharts-figure{
            min-width: 320px; 
            max-width: 800px;
            margin: 1em auto;
        }
        #container {
            height: 450px;
        }  
  </style>