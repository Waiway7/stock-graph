import "./styles/index.scss";
import {drawChart} from "./graph/line_chart.js";
import {retreiveAllSecurity} from "./data/retreive_all_security"
import {retreiveSecurityData} from "./data/retreive_security_data"
import * as d3 from "d3";


window.addEventListener("DOMContentLoaded", () => {
  retreiveAllSecurity();
  retreiveSecurityData("AAPL")
});
