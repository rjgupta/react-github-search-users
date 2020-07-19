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
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

// STEP 2 - Chart Data

// STEP 3 - Creating the JSON object to store the chart configurations

const ChartComponent = ({data}) => {
  const chartConfigs = {
    type: "bar3d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: 'Most Forked Language',
        //Set the theme for your chart
        theme: "fusion",     
        //Set the chart subcaption
        // subCaption: 'fusion',
        //Set the x-axis name
        xAxisName: "Repos",
        xAxisNameFontSize: "16px",
        // //Set the y-axis name
        yAxisName: "Forks",
        yAxisNameFontSize: "16px"   
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
