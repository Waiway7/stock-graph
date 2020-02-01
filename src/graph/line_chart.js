import * as d3 from "d3";

export function drawChart(data){
    const svgWidth = 600, svgHeight = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 50};
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;
    const svg = d3.select("#chart").append("svg")
                    .attr("width", svgWidth)
                    .attr("height", svgHeight)
                    .style("border", "1px solid lightgray")
    const g = svg.append("g")
                .attr("transform", "translate(" + margin.left + ", "+ margin.top + ")")
    const x = d3.scaleTime().rangeRound([0, width]);
    const y = d3.scaleLinear().rangeRound([height, 0])

    const line = d3.line()
                    .x(function(d){return x(data.date)})
                    .y(function(d){return y(data.value)})
}

