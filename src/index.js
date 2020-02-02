import "./styles/index.scss";
import {drawChart} from "./graph/line_chart.js";
import {retreiveSecurityData} from "./data/retreive_security_data"


window.addEventListener("DOMContentLoaded", () => {
  console.log(process.env.API_KEY)
  retreiveSecurityData()

  
});
