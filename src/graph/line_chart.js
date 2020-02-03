import * as d3 from "d3";

const parseData = (data) => {
    const dataArr = [];
    for (let i = data.length - 1; i >= 0; i--){
        dataArr.push({
            "date": new Date(data[i].date),
            "close": data[i].close
        })
    }
    return dataArr
}


export function drawChart(dataArr){
    const parentDiv = document.getElementById("chart");
    // const svgWidth = 600
    // const svgHeight = 400
    const data = parseData(dataArr);
    // const svgWidth = 1500, svgHeight = 400;
    
    const div = d3.select("#chart")
                    .append("div")
                    .classed("svg-container", true)

    const svg = div.append("svg")
                    .classed("svg-graph", true)
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0 850 400")
    
    const findSVG = document.querySelector(".svg-graph")
    const svgWidth = 800;
    const svgHeight = 400;


    const infoContainer = d3.select(".svg-container")
                            .append("div")
                            .classed("security-info", true)
   

    const margin = { top: 20, right: 20, bottom: 30, left: 18};
    const width = svgWidth - margin.left - margin.right;
    // console.log(width)
    const height = svgHeight - margin.top - margin.bottom;

    const g = svg.append("g")
                .attr("transform", "translate(" + margin.left + ", "+ margin.top + ")")
    const x = d3.scaleTime().range([0, width]).nice();
    const y = d3.scaleLinear().range([height, 0])

    const line = d3.line()
                    .x(function(d){return x(d.date)})
                    .y(function(d){return y(d.close)})
   
    x.domain(
        d3.extent(data, function(d){return d.date}))
        .nice();
    y.domain(d3.extent(data, function(d){return d.close}))
        .nice();

    g.append("g")
        .attr("transform", "translate(0, " + height + ")")
        .call(d3.axisBottom(x)
            .tickFormat(function(d){
                const month = d.getMonth().toString().length === 1 ? `0${d.getMonth() + 1}` : d.getMonth();
                const day = d.getDate().toString().length === 1 ? "0" + d.getDate().toString() : d.getDate();
                if (month === 1 && day === 1){
                    return d.getFullYear()
                }
                return `${month}-${day}`
            })
        )

    g.append("g")
        .attr("transform", "translate(" + width +", "+ 0 + ")")
        .call(d3.axisRight(y));

    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line)
}

