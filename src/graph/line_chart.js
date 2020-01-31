import * as d3 from "d3";

const drawChart = (data) => {
    const svgWidth = 600, svgHeight = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 50};
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin-bottom;
    const svg = d3.select('svg')
                    .attr("width", svgWidth)
                    .attr("height", svgHeight)
}