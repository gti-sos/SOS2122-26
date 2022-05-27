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

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
let chartConfigs = {};
let dataSource = {};
/*---- Datos Defensa ----*/

let defenseData = [];
let defenseChartInfo1 = []; 
let defenseChartTotal1 = [];

let defenseChartInfo2 = [];
let defenseChartTotal2 = [];


async function loadStats(){
    console.log("Fetching graphic data...");

     /*-----Const por API-----*/ 
    const resDefense = await fetch(BASE_DEFENSE_PATH);
    if(resDefense.ok){
        defenseData = await resDefense.json();
        defenseData.sort((a,b) => a.country.localeCompare(b.country));
        defenseData.forEach(stat => {
                if(stat.year == 2020 && (stat.country !="gabon" && stat.country !="barbados" 
                    && stat.country !="albania" && stat.country !="bangladesh")){
                    defenseChartInfo1.push({label: stat.country});
                    defenseChartTotal1.push({value: stat["spen_mill_eur"]});
                }else if(stat.year == 2019){
                    defenseChartInfo2.push({label: stat.country});
                    defenseChartTotal2.push({value: stat["spen_mill_eur"]});
                }
            });

            await delay(1000);

        //Datos en gráfica
        dataSource = {
        chart: {
        caption: "Comparación del gasto en defensa entre 2020 y 2019",
        xAxisname: "Paises",
        yAxisName: "Moneda (USD)",
        numberPrefix: "$",
        theme: "fusion",
        },
        categories: [
        {
            category: defenseChartInfo1,
        }
        ],
        dataset: [
        {
            seriesname: "2019",
            data: defenseChartTotal2,
        },
        {
            seriesname: "2020",
            data: defenseChartTotal1,
        }
        ]
        };    

        loadGraph();

    }else{
        console.log("Error");
    }

}

console.log("por aqui vamos");


async function loadGraph(){
    console.log("Datos cargados");
    console.log(defenseChartInfo2);
    console.log(defenseChartInfo1);


    chartConfigs = {
    type: "mscolumn2d", //Select the chart type
    width: 1000, //Set the width of the chart
    height: 800, //Set the height of the chart
    renderAt: "chart-container",
    dataFormat: "json", //Set the input dataFormat to json
    dataSource,    
    };

};
onMount(loadStats);

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