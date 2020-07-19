// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type: default
// import Column2D from "fusioncharts/fusioncharts.charts";
// renaming Column2D to Chart
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion: default
// import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";


// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

// STEP 2 - Chart Data

// STEP 3 - Creating the JSON object to store the chart configurations

const ChartComponent = ({data}) => {
  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: 'Stars per Language',
        //Set the theme for your chart
        theme: "candy",
        // decimals: values between 0 and 1.
        decimals: 0,
        // size of the Pie
        doughnutRadius: "35%", 
        showPercentValues: 0,               
        //Set the chart subcaption
        // subCaption: 'fusion',
        //Set the x-axis name
        // xAxisName: "",
        // //Set the y-axis name
        // yAxisName: "",
        // numberSuffix: "K",        
      },
      // Chart Data
      // data:data or
      data
    }
  };

  return (
    <ReactFC {...chartConfigs} />
  )
}

export default ChartComponent;
