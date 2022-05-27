<script>
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


    const chartData = [
  { label: "Venezuela", value: "290" },
  { label: "Saudi", value: "260" },
  { label: "Canada", value: "180" },
  { label: "Iran", value: "140" },
  { label: "Russia", value: "115" },
  { label: "UAE", value: "100" },
  { label: "US", value: "30" },
  { label: "China", value: "30" }
    ];

    //Create your configuration object
    const chartConfigs = {
    type: "column2d", //Select the chart type
    width: 600, //Set the width of the chart
    height: 400, //Set the height of the chart
    dataFormat: "json", //Set the input dataFormat to json
    dataSource: {

        chart: {
            caption: "Countries With Most Oil Reserves [2017-18]", //Set the caption to your chart
            subCaption: "In MMbbl = One Million Barrels", //Set a sub-caption to your chart
            xAxisName: "Country", //Assign a relevant name to your x-axis
            yAxisName: "Reserves (MMbbl)", //Assign a relevant name to your y-axis
            numberSuffix: "K",
            theme: "fusion" //Apply a theme to your chart
            },
    //Include chartData from STEP 2
    data: chartData
        }
    };
  </script>

<SvelteFC {...chartConfigs} />