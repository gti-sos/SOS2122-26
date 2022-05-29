<script>
    import { onMount } from "svelte";
    import {Col, Container, Row} from "sveltestrap";
    import { md5 } from "blueimp-md5";
    
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    let apiData = [];

    const BASE_ELEC_PATH = "/api/v2/electricity-generation-stats";
    const EXTERNAL_API_1 = "/externalAPIV1"; //smi

    let smi_eur_Data = []
    let rick_morty_Data = [];
    let drinks_Data = [];
    let holidays_Data = [];

    const date = new Date();
    let minY = 2020;
    let maxY = 0;

    let m = new Map();
    let m2 = new Map();
    let m3 = new Map();

    let years = [];

    let yK = [];
    let lab = [];

    function sortSet(set) {
        const entries = [];
        for (const member of set) {
            entries.push(member);
        }
        set.clear();
        for (const entry of entries.sort()) {
            set.add(entry);
        }
        return set;
    }

    async function getData() {
         // RICK y MORTY:
        const res1 = await fetch("https://rickandmortyapi.com/api/character");
        if (res1.ok) {
            const json = await res1.json();
            apiData = json.results;

            apiData.forEach((e) => {
                rick_morty_Data.push({label: e.name, value: e.episode.length})
            });
            
            await delay(1000);
            loadGraph1();
        } else {
            console.log("Error in request");
        }
        
        //SMI:
        await fetch(EXTERNAL_API_1 + "/loadInitialData");
        const res2 = await fetch(EXTERNAL_API_1);
        if (res2.ok) {
            let s = new Set();
            const json = await res2.json();
            apiData = json;
            apiData.forEach((e) => {
                s.add(e.year);
            });

            let sortedS = sortSet(s);
            sortedS.forEach((e) => {
                years.push(e);
            });

            apiData.forEach((e) => {
                if (m.has(e.year)) {
                    let lAux =  [e.country, e.smi_euros];
                    m.get(e.year).push(lAux);
                } else {
                    let lAux = [e.country, e.smi_euros];
                    m.set(e.year, [lAux]);
                }
               
                if (e.year < minY) {
                    minY = e.year;
                }
                if (e.year > maxY) {
                    maxY = e.year;
                }
            });

            await delay(1000);
            loadGraph2();
        } else {
            console.log("Error in request");
        }

        //Drinks:
  
        const res3 = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=S");
        if (res3.ok) {
            const json = await res3.json();
            apiData = json.drinks;

            apiData.forEach((e) => {
                let cont = 0;
                for(var i = 1; i < 16; i++){
                    if(e['strIngredient' + i.toString()] !== null){
                        cont++;
                    }else{
                        break;
                    }
                }
                drinks_Data.push({serie: cont, label: e.strDrink})
            });
            
            await delay(1000);
            loadGraph3();
        } else {
            console.log("Error in request");
        }
        //Festivos España
        const res4 = await fetch('https://date.nager.at/api/v3/PublicHolidays/2020/ES');
        if (res4.ok) {
            const json = await res4.json();
            apiData = json;
            let AN = 0; //Reg Andalucia
            let M = 0; //Reg Madrid
            let CT = 0; //Reg Cataluña
            let VC = 0; //Reg Valencia

            apiData.forEach(e => {
                if(e.counties){
                    if(e.counties.includes('ES-AN')){
                        AN++;
                    }
                    if(e.counties.includes('ES-M')){
                        M++;
                    }
                    if(e.counties.includes('ES-CT')){
                        CT++;
                    }
                    if(e.counties.includes('ES-VC')){
                        VC++;
                    }
                } else{
                    AN++;
                    M++;
                    CT++;
                    VC++;

                }
            });
            holidays_Data.push({place: 'Andalucía', holidays: AN});
            holidays_Data.push({place: 'Madrid', holidays: M});
            holidays_Data.push({place: 'Cataluña', holidays: CT});
            holidays_Data.push({place: 'Valencia', holidays: VC});
            
            await delay(1000);
            loadGraph4();
        } else {
            console.log("Error in request");
        }
        
       
    }

    async function loadGraph1() {

        new Morris.Donut({
            element: "container1",
            data: rick_morty_Data,
        });
        
        
    }
    async function loadGraph2() {
        var options = {
          series: [
          {
            name: '2020',
            data: [
             
            ]
          }
        ],
          chart: {
          height: 350,
          type: 'bar'
        },
        plotOptions: {
          bar: {
            columnWidth: '60%'
          }
        },
        colors: ['#00E396'],
        dataLabels: {
          enabled: false
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['2020', '2019'],
          markers: {
            fillColors: ['#00E396', '#775DD0']
          }
        }
        };

        const m2020 = m.get(2020);
        const m2019 = m.get(2019);
        m2020.forEach(e=> options.series[0].data.push({
                    x: e[0],
                    y: e[1],
                    goals: [
                    {
                        name: '2019',
                        value: m2019.filter((x => x[0] === e[0]))[0][1],
                        strokeHeight: 5,
                        strokeColor: '#775DD0'
                    }
                    ]
            })
            
            );
        var chart = new ApexCharts(document.querySelector("#smi"), options);
        chart.render();
        
    }
    async function loadGraph3(){
        var options = {
          series: [
              
          ],
          labels: [
          ],
          chart: {
            height: 700,
            type: 'polarArea',
        },
        stroke: {
          colors: ['#fff']
        },
        fill: {
          opacity: 0.8
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 10
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
        };
        drinks_Data.forEach(e => {
            options.series.push(e.serie);
            options.labels.push(e.label);
        })
        var chart = new ApexCharts(document.querySelector("#drinks"), options);
        chart.render();
    }

    async function loadGraph4(){
        var options = {
          series: [{
            name: 'Vacaciones',
            data: [

            ]
        }],
          chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [
          ],
        }
        };

        holidays_Data.forEach(e => {
            options.series[0].data.push(e.holidays);
            options.xaxis.categories.push(e.place);

        })

        var chart = new ApexCharts(document.querySelector("#holidays"), options);
        chart.render();
    }
    
        


    onMount(getData);
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>

    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css"/>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>
    
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    
    
</svelte:head>


<main>
    <figure class="highcharts-figure" style="margin-top: 50px;">
        <Row>
            <h5 class="text-center">Apariciones en capítulos únicos por personaje (Rick y Morty)</h5>
        </Row>
        <div class="text-center" id="container1" />
        <br />
    </figure>
    
    <Row>
        <h5 class="text-center">Comparación SMI 2020 y 2019 </h5>
    </Row>
    <div id="smi"></div>
    <Row>
        <h5 class="text-center">Recuento de ingredientes de distintas bebidas alcoholicas </h5>
    </Row>
    <div id="drinks"></div>
    <Row>
        <h5 class="text-center">Comparación Vacaciones por regiones </h5>
    </Row>
    <div id="holidays"></div>

</main>
