import * as d3 from "d3";

const parseData = (data) => {
    const dataArr = [];
    for (let i = data.length - 1; i >= 0; i--){
        dataArr.push({
            "date": data[i].date,
            "close": data[i].close
        })
    }
    console.log(dataArr)
    return dataArr
}
export function drawChart(dataArr){
    const data = parseData(dataArr);
    const svgWidth = 1500, svgHeight = 400;
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
                    .x(function(d){return x(d.date)})
                    .y(function(d){return y(d.close)})
                    
    x.domain(d3.extent(data, function(d){return d.date}));
    y.domain(d3.extent(data, function(d){return d.close}));
    g.append("g")
        .attr("transform", "translate(0, " + height + ")")
        .call(d3.axisBottom(x))
       

}

