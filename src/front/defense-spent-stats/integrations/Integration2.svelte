<script>

import {onMount} from 'svelte';   

//Import the Fusioncharts library
import FusionCharts from "fusioncharts";

//Import the chart modules
import Charts from "fusioncharts/fusioncharts.charts";

//Import the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

//Import the Svelte component
import SvelteFC, { fcRoot } from "svelte-fusioncharts";

// Always set FusionCharts as the first parameter
fcRoot(FusionCharts, Charts, FusionTheme);

const BASE_DEFENSE_PATH = "/api/v2/defense-spent-stats";
const REMOTE_API_2 = "/remoteAPIV2";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
let chartConfigs = {};
let dataSource = {};
/*---- Datos Defensa ----*/

let defenseData = [];
let defenseChartInfo = []; 
let defenseChartTotal = [];

/*---- Datos Gasto publico (remote api) ----*/

let popData = [];
let popChartInfo = [];
let popChartDeath = [];

console.log("que dise");



async function loadStats(){
    console.log("Fetching graphic data...");

     /*-----Const por API-----*/
     await fetch(BASE_DEFENSE_PATH + "/loadInitialData");  
     const resDefense = await fetch(BASE_DEFENSE_PATH);
     await fetch(REMOTE_API_2 + "/loadInitialData");
     const resPop = await fetch(REMOTE_API_2);

    

    console.log("procesing all data....");

    if(resDefense.ok && resPop.ok){

        //DEFENSE API

        defenseData = await resDefense.json();
        console.log("Tratando Defensa");
        defenseData.sort((a,b) => a.country.localeCompare(b.country));
            defenseData.forEach(stat => {
                if(stat.year == 2020 && (stat.country=="gabon" || stat.country=="barbados" 
                    || stat.country=="albania" || stat.country=="bangladesh")){
                    defenseChartInfo.push({label: stat.country});
                    defenseChartTotal.push({value: stat["per_capita"]});
                }
            });

        //DEBT API
        popData = await resPop.json();
        console.log("Tratando Death");
        
        popData.sort((a,b) => a.country.localeCompare(b.country));
        popData.forEach(stat => {
                if(stat.year == 2020){
                    popChartInfo.push({label: stat.country});
                    popChartDeath.push({value: stat["life_expectancy_birth"]});
                }
            });
        

        await delay(1000);

        //Datos en gráfica
        dataSource = {
        chart: {
        caption: "Comparación del gasto en defensa per capita y edad media de defunción en paises en vía de desarrollo en 2020",
        xAxisname: "Paises",
        yAxisName: "Moneda (USD)",
        theme: "fusion",
        },
        categories: [
        {
            category: popChartInfo,
        }
        ],
        dataset: [
        {
            seriesname: "Gasto per capita en Defensa",
            showValues : 1,
            data: defenseChartTotal,
        },
        {
            seriesname: "Edad Media Defunción",
            renderAs: "area",
            data: popChartDeath,
        }
        ]
        };    

    loadGraph();
    }else{
        console.log("Error");
    }
};



console.log("por aqui vamos");


async function loadGraph(){
    console.log("Datos cargados");
    console.log(popChartDeath);
    console.log(popChartInfo);
    console.log(defenseChartInfo);

    chartConfigs = {
    type: "mscombi2d", //Select the chart type
    width: 1000, //Set the width of the chart
    height: 800, //Set the height of the chart
    renderAt: "chart-container",
    dataFormat: "json", //Set the input dataFormat to json
    dataSource,    
    };

};
onMount(loadStats);



/*-----Declaración de Gráfica conjunta-----*/



</script>

<main>
   <div class=tabla> <SvelteFC {...chartConfigs} /> </div>
</main>

<style>
    .tabla{
        min-width: 320px; 
        max-width: 800px;
        margin: 1em auto;
    }
</style>

