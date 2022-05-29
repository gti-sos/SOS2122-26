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
    
    
    
const HEARTHSTONE_PATH = "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/Goblins%20vs%20Gnomes?rapidapi-key=16a223c8b0msh4bfbfb189f95a0dp1822e1jsnfbfe42809539";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
let chartConfigs = {};
let dataSource = {};

let hearthstoneStats = [];
let common = [];
let rare = [];
let epic = [];
let legendary = [];
let dataH = [];

async function loadStats(){
    console.log("Fetching url...");
    const res = await fetch(HEARTHSTONE_PATH);

    if(res.ok){
        hearthstoneStats = await res.json();
        hearthstoneStats.forEach(stat => {
            
            if(stat.rarity != null){
                if(stat.rarity == "Common"){
                    common.push(stat.rarity);
                }else if(stat.rarity == "Rare"){
                    rare.push(stat.rarity);
                }else if(stat.rarity == "Epic"){
                     epic.push(stat.rarity);
                }else{
                    legendary.push(stat.rarity);
                }
              }
        });

        dataH = [ {label: "Common" , value:rare.length},{label: "Rare" , value:common.length},{label: "Epic" , value:epic.length},{label: "Legendary" , value:legendary.length} ];

        await delay(1000);

        //Datos en la gráfica

        dataSource = {
        chart: {
        caption: "Numero de tipos de carta según su rareza en HearthStone",
        subCaption : "Goblins vs Gnomos",
        enableSmartLabels : 0,
        startingAngle: 0,
        showPercentValues: 1,
        decimals: 1,
        useDataPlotColorForLabels: 1,
        theme: "fusion",
        }, data : dataH
        };    

        loadGraph();



    }else{
        console.log("Error");
    }
}


async function loadGraph(){
    console.log("Datos cargados");

    chartConfigs = {
    type: "pie2d", //Select the chart type
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