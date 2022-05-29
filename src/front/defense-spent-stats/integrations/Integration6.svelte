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
    
    
    
const WEATHER_API = "http://api.weatherapi.com/v1/forecast.json?key=5edf233a7e82475d8f3234418210306&q=SVQ";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
let chartConfigs = {};
let dataSource = {};

let wetaherStats = [];
let weatherHours = [];
let weatherEibar = [];

async function loadStats(){
    console.log("Fetching url...");
    const res = await fetch(WEATHER_API);

    if(res.ok){

        wetaherStats = await res.json();
        weatherHours= wetaherStats.forecast.forecastday[0].hour;
        let i
        for(i=0;i<weatherHours.length;i++){
            let aux= weatherHours[i].time.split(" ")
            weatherEibar.push({
                label: aux[1],
                value: weatherHours[i].temp_c
            })
        }
        console.log(weatherEibar)

        await delay(1000);

        dataSource = {
        chart: {
            caption: "Previsión precipitaciones Sevilla",
            showPercentValues: 1,
            xAxisName : "Horas",
            yAxisName: "Previsión",
            decimals: 1,
            theme: "fusion",
            },
            data : weatherEibar
        }; 

        loadGraph();

    }else{
        console.log("Error");
    }
}

async function loadGraph(){
    console.log("Datos cargados");

    chartConfigs = {
    type: "area2d", //Select the chart type
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