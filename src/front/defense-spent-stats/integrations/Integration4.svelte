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

const REMOTE_API_4 = "/api/v2/remoteAPIV4";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
let chartConfigs = {};
let dataSource = {};

let extStats = [];
let countries = [];
let deaths = [];

async function loadStats(){
    console.log("Fetching url...");	
    const res = await fetch(REMOTE_API_4);

    if(res.ok){
    extStats = await res.json();
    console.log("Recived covid data...");
    console.log(extStats);

    extStats.forEach(stat => {
              if(stat.rank <= 20){
                countries.push({label:stat.Country});
                deaths.push({value:stat.TotalDeaths});
              }
            });
    console.log(extStats);

    await delay(1000);

    dataSource = {
    chart: {
    caption: "Muertes por país debido al Covid-19",
    xAxisname: "Paises",
    yAxisName: "Muertes",
    theme: "fusion",
    },
    categories: [
    {
        category: countries,
    }
    ],
    dataset: [
    {
        seriesname: "Muertes",
        data: deaths,
    },
    ]
    };    

    loadGraph();
    
    }else{
        console.log("Error");
    }

}

async function loadGraph(){
    console.log("Datos cargados");

    chartConfigs = {
    type: "msbar3d", //Select the chart type
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