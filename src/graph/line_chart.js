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
    const svgWidth = 600
    const svgHeight = 400
    const data = parseData(dataArr);
    // const svgWidth = 1500, svgHeight = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 50};
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;
    const svg = d3.select("#chart")
                    .append("div")
                    .classed("svg-container", true)
                    .append("svg")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0 700 400")
                    // .classed("svg-content-responsive", true)
                    // .append("svg")
                    .attr("width", "70%")
                    .attr("height", "70%")
                    .style("border", "1px solid lightgray")
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
                const month = d.getMonth() + 1
                const day = d.getDate();
                if (month === 1 && day === 1){
                    return d.getFullYear()
                }
                return `${month}-${day}`
            })
        )

    g.append("g")
        .call(d3.axisRight(y));
}

