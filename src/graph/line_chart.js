import * as d3 from "d3";
import {elementHTML} from "./elements"
import {toolTip} from "./tool-tip"

const parseData = (data) => {
    for (let i = data.length - 1; i >= 0; i--){
        let date = new Date(data[i].date).setHours(0,0,0,0)
        data[i].date = new Date(date)
    }
    return data
}

const dummyElements = (svg, data, dataType) => {
    const textWidth = [];
    svg.append('g')
        .selectAll('.dummyText')
        .data(data)
        .enter()
        .append("text")
        .attr("font-family","sans-serif")
        .attr("font-size", "12px")
        .text((d) => dataType(d))
        .each(function(d, i) {
            const width = this.getComputedTextLength();
            textWidth.push(width)
            this.remove()
        })
    return textWidth
}

export function drawChart(dataArr){
    console.log(dataArr)

    //Functions to get close price and date
    const close = (d) => d.close.toFixed(2);
    const date = (d) => d.date;

    //View Box of Graph
    const svgWidth = 800;
    const svgHeight = 400;
    const margin = { top: 40, right: 20, bottom: 30, left: 18};
    const dimensions = {
        width: (svgWidth - margin.left - margin.right),
        height: (svgHeight - margin.top - margin.bottom)
    }

    //Stock information
    const latestStockInformation = dataArr.stock_prices[0]
    const data = parseData(dataArr.stock_prices).reverse();

    elementHTML();

    //Position of SVG
    const svg = d3.select(".svg-graph")
                    .append("g")
                    .attr("class", "graph")
                    .attr("transform", "translate(" + margin.left + ", "+ 10 + ")")

    //Getting the ranges of y and domain of y and ticks
    const xScale = d3.scaleTime().range([0, dimensions.width]).domain(d3.extent(data, function(d){return d.date}));
    const yScale = d3.scaleLinear().range([dimensions.height, 0]).domain(d3.extent(data, function(d){return d.close})).nice();

    const xDomain = xScale.domain();
    const yRange = yScale.domain();
    
    //Gets the width of text
    const textWidth = dummyElements(svg, data, close)

    //X-Axis and format of the labels
    svg.append("g")
        .attr('class', 'x-axis')
        .attr("transform", "translate(0, " + dimensions.height + ")")
        .call(d3.axisBottom(xScale)
            // .ticks(d3.timeWeek.filter(d=>d3.timeDay.count(0, d) % 1 === 0))
            // .tickFormat(d3.timeFormat('%m/%d'))
            // .tickSizeOuter(0)
            .tickFormat(function(d){
                const month = (d.getMonth() + 1).toString().length === 1 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
                const day = d.getDate().toString().length === 1 ? "0" + d.getDate().toString() : d.getDate();
                return `${month}-${day}`
            })
                 .tickPadding(8)
            .tickSize(-dimensions.height)
        )
        .call(g => {
            g.selectAll("text")
                .attr('fill', '#000000')
                .attr('stroke-width', 0.7)
            g.selectAll('text'[0][0])
                .attr('opacity', 0)    

            g.selectAll("line")
                .attr('stroke', '#A9A9A9')
                .attr('stroke-width', 0.7)
                .attr('opacity', 0.3)

            g.select(".domain")
                .attr('stroke', "#A9A9A9")
                .attr('stroke-width', 0.7)
                .attr('opacity', 0)
        })

    //Y-axis and formats labels
    svg.append("g")
        .attr('class', 'y-axis')
        .attr("transform", "translate(" + dimensions.width +", "+ 0 + ")")
        .call(d3.axisRight(yScale)
            .tickFormat((d) => {
                return d3.format(".2f")(d)
            })
            .tickPadding(4)
            .tickSize(-dimensions.width))
        .call(g => {
            g.selectAll("text")
                .attr('fill', '#000000')
                .attr('stroke-width', 0.7)
                // .attr('opacity', 0.3)

            g.selectAll("line")
                .attr('stroke', '#A9A9A9')
                .attr('stroke-width', 0.7)
                .attr('opacity', 0.3)

            g.select(".domain")
                .attr('stroke', "#A9A9A9")
                .attr('stroke-width', 0.7)
                .attr('opacity, 0.3')
            // g.select(".domain")
            //     .attr('stroke', "none")
        })
    //Displays current close price
    svg.append("rect")
        .attr('class', "latest-container")
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("fill", "#009933")
        .attr("transform", "translate(" + (xScale(xDomain[1])) + "," + (yScale(latestStockInformation.close.toFixed(2)) - 7.5) + ")")
        .attr("width", `${textWidth[textWidth.length - 1] + 2}`)
        .attr("height", "14")
        
    svg.append("text")
        .attr("class", "latest-close-price")
        .style("fill", "#FFFFFF")
        .attr("dy", ".31em")
        .text(latestStockInformation.close.toFixed(2))
        .attr("transform", "translate(" + (xScale(xDomain[1]) + 4) + "," + (yScale(latestStockInformation.close.toFixed(2))) + ")");

    //Creates the line
    const line = d3.line()
        .x(function(d){return xScale(d.date)})
        .y(function(d){return yScale(d.close)})

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.0)
        .attr("d", line)
    toolTip(data, dimensions, margin, xScale, yScale, xDomain, yRange, textWidth, dataArr.security)
}

