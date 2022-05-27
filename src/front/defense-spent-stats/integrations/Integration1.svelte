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
const REMOTE_API_1 = "/remoteAPIV1"; //public-debt-stats

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
let chartConfigs = {};
let dataSource = {};
/*---- Datos Defensa ----*/

let defenseData = [];
let defenseChartInfo = []; 
let defenseChartTotal = [];

/*---- Datos Gasto publico (remote api) ----*/

let debtData = [];
let debChartInfo = [];
let debChartTotal = [];

console.log("que dise");



async function loadStats(){
    console.log("Fetching graphic data...");

     /*-----Const por API-----*/
     await fetch(BASE_DEFENSE_PATH + "/loadInitialData");  
     const resDefense = await fetch(BASE_DEFENSE_PATH);
     await fetch(REMOTE_API_1 + "/loadInitialData");
     const resDept = await fetch(REMOTE_API_1);

    

     console.log("procesing all data....");

    if(resDefense.ok && resDept.ok){

        //DEFENSE API

        defenseData = await resDefense.json();
        console.log("Tratando Defensa");
        defenseData.sort((a,b) => a.country.localeCompare(b.country));
            defenseData.forEach(stat => {
                if(stat.year == 2020 && (stat.country=="germany" || stat.country=="spain" 
                    || stat.country=="france" || stat.country=="united states")){
                    defenseChartInfo.push({label: stat.country});
                    defenseChartTotal.push({value: stat["spen_mill_eur"]*100});
                }
            });

        //DEBT API
        debtData = await resDept.json();
        console.log("Tratando Deuda");
        
        debtData.sort((a,b) => a.country.localeCompare(b.country));
        debtData.forEach(stat => {
                if(stat.year == 2020){
                    if(stat.country=="españa"){
                        stat.country = "spain";
                    }else if(stat.country=="alemania"){
                        stat.country = "germany";
                    }else if(stat.country=="francia"){
                        stat.country = "france";
                    }else if(stat.country=="reino unido"){
                        stat.country = "united states";
                    }
                    debChartInfo.push({label: stat.country});
                    debChartTotal.push({value: stat["total_debt"]});
                }
            });
        

        await delay(1000);

        //Datos en gráfica
        dataSource = {
        chart: {
        caption: "Comparación del gasto público y en defensa en 2020",
        xAxisname: "Paises",
        yAxisName: "Moneda (USD)",
        numberPrefix: "$",
        theme: "fusion",
        },
        categories: [
        {
            category: debChartInfo,
        }
        ],
        dataset: [
        {
            seriesname: "Gasto en Defensa",
            data: defenseChartTotal,
        },
        {
            seriesname: "Gasto público",
            data: debChartTotal,
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
    console.log(debChartTotal);
    console.log(debChartInfo);
    console.log(defenseChartInfo);

    chartConfigs = {
    type: "msbar2d", //Select the chart type
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
