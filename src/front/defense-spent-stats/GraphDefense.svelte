<script>
    import { pop }from "svelte-spa-router";
    import {Button} from "sveltestrap";

    const BASE_API_PATH = "/api/v2/defense-spent-stats";

    let defenseData = [];
    let defenseChartData = [];
    let defenseChartCountryYear = [];
    let defenseChartSpen_mill_eur = [];
    let defenseChartPublic_percent = [];
    let defenseChartPib_percent = [];
    let defenseChartPer_capita = [];
    let defenseChartVar = [];

    let errorMsg = "";
    let okMsg = "";


    async function loadGraphic() {
      console.log("Fetching data...");
      const res = await fetch(BASE_API_PATH);
      defenseData = await res.json();
      if (res.ok) {
        defenseData.forEach(stat => {
            defenseChartCountryYear.push(stat.country+"/"+stat.year);
            defenseChartSpen_mill_eur.push(stat.spen_mill_eur);
            defenseChartPublic_percent.push(stat.public_percent);
            defenseChartPib_percent.push(stat.pib_percent);
            defenseChartPer_capita.push(stat.per_capita);
            defenseChartVar.push(stat.var);
        });
      }
      
      console.log("Defense Spent Chart Data: " + defenseChartData);
      Highcharts.chart("container", {
        title: {
          text: "Estadísticas sobre el gasto militar",
        },
        yAxis: {
          title: {
            text: "Gasto",
          },
        },
        xAxis: {
          title: {
            text: "País y Año",
          },
          categories: defenseChartCountryYear,
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
        },
        annotations: [
          {
            labels: [
              {
                point: "date",
                text: "",
              },
              {
                point: "min",
                text: "Min",
                backgroundColor: "white",
              },
            ],
          },
        ],
        series: [
          {
            name: "Gasto en millones",
            data: defenseChartSpen_mill_eur,
          },
          {
            name: "Gasto público en defensa",
            data: defenseChartPublic_percent,
          },
          {
            name: "% PiB destinado a defensa",
            data: defenseChartPib_percent,
          },
          {
            name: "Gasto per Capita en defensa",
            data: defenseChartPer_capita,
          },
          {
            name: "Variación en gasto",
            data: defenseChartVar,
          }

          
        ],
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
      });
    }
  </script>

  <svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script
      src="https://code.highcharts.com/modules/accessibility.js"
      on:load={loadGraphic}></script>
  </svelte:head>

  <main>
    <div>
      <h2>
        Gráfico
      </h2>
    </div>
  
    <div>
      {#if errorMsg}
        <p class="msgRed" style="color: #9d1c24">ERROR: {errorMsg}</p>
      {/if}
      {#if okMsg}
        <p class="msgGreen" style="color: #155724">{okMsg}</p>
      {/if}
    </div>
  
    <div>
      <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
          Representación lineal del gasto en Defensa por País y Año
          representado en cada tipo de gasto.
        </p>
      </figure>
    </div>
    <a href="#/defense-spent-stats"><Button outline color="primary"  on:click={pop} >Volver</Button></a>
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 1em;
      margin: 0 auto;
    }
    div{
      margin-bottom: 15px;
    }
    p {
      display: inline;
    }
    .msgRed {
      padding: 8px;
      background-color: #f8d7da;
    }
    .msgGreen {
      padding: 8px;
      background-color: #d4edda;
    }
  </style>