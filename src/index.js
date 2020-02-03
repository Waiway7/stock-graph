import "./styles/index.scss";
import {drawChart} from "./graph/line_chart.js";
import {retreiveSecurityData} from "./data/retreive_security_data"
import * as d3 from "d3";


window.addEventListener("DOMContentLoaded", () => {
  console.log(process.env.API_KEY)
  // d3.select("#chart")
  //   .append("div")
  //   .classed("svg-container", true)
  //   .append("svg")
  //   .classed("svg-graph", true)
  //   .attr("preserveAspectRatio", "xMinYMin meet")
  //   .attr("viewBox", "0 0 600 400")
  //   .style("border", "1px solid lightgray")

  retreiveSecurityData()

  
});
