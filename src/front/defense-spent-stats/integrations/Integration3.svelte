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

const REMOTE_API_3 = "/remoteAPIV3";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
let chartConfigs = {};
let dataSource = {};

let popData = [];
let cityName = "";
let countryName = "";
let years = [];
let population = [];

async function loadStats(){
    const resPop = await fetch(REMOTE_API_3);
    console.log("dentro");
    if(resPop.ok){
        let json = await resPop.json();

        popData = json.data[105];
        countryName = popData["country"];
        cityName = popData["city"];

        popData["populationCounts"].forEach(stat => {
                years.push({label:stat["year"]});
                population.push({value:stat["value"]});
            });
        console.log("Data:", popData);
        console.log("Poblacion de " + cityName + " en " + countryName);
        console.log("Años: ",years );
        console.log("Poblacion: ",population);   

        await delay(1000);

        //Datos en la gráfica

        dataSource = {
        chart: {
        caption: "Comparación de población en "+countryName+" en la ciudad "+cityName+" en diferentes años",
        xAxisname: "Años",
        yAxisName: "Poblacion",
        theme: "fusion",
        },
        categories: [
        {
            category: years,
        }
        ],
        dataset: [
        {
            seriesname: "Tamaño población",
            showValues : 1,
            data: population,
        },
        ]
        };    

        loadGraph();
        
    }else{
        console.log("Error");
    }


};

async function loadGraph(){
    console.log("Datos cargados");

    chartConfigs = {
    type: "stackedcolumn2d", //Select the chart type
    width: 1000, //Set the width of the chart
    height: 800, //Set the height of the chart
    renderAt: "chart-container",
    dataFormat: "json", //Set the input dataFormat to json
    dataSource,    
    };
}
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