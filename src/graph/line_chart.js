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

const toolTip = (data, svg, width, height, margin, xScale, yScale, xDomain, yDomain, textWidth) => {

    const bisectDate = d3.bisector((d) => d.date).left
    const focus = svg.append("g")
                    .attr("class", "focus")
                    .style("display", "none");

                    
    focus.append("line")
        .attr("class", "x-hover-line")

    focus.append("line")
        .attr("class", "y-hover-line")

    svg.append("rect")
        .attr('class', "close-price-container")
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("dy", "4em")

    svg.append("text")
        .attr("class", "close-price") 

    svg.append("rect")
        .attr('class', "target-date-container")
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("dy", "4em")

    svg.append("text")
        .attr("class", "target-date")  

    svg.append("rect")
        .attr("transform", "translate(" + 0 + "," + margin.top + ")")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { 
            focus.style("display", null); 
            d3.select(this).style("cursor", "crosshair");
            svg.select(".target-date")
                .style("display",null)
                .style("fill", "#FFFFFF")
    
                .attr("dy", "1.05em");
            svg.select(".target-date-container")
                .style("display", null)
                .style("fill", "#0000000")

            svg.select(".close-price-container")
                .style("display", null)
                .style("fill", "#0000000")
            svg.select(".close-price")
                .style("display",null)
                .style("fill", "#FFFFFF")
    
                .attr("dy", ".31em");
        })
        .on("mouseout", function() { 
            focus.style("display", "none")
            svg.select(".close-price-container").style("display", "none")
            svg.select(".close-price").style("display", "none")
            svg.select(".target-date").style("display", "none")
            svg.select(".target-date-container").style("display", "none")
        })
        .on("mousemove", mousemove);

    function mousemove() {
        var x0 = xScale.invert(d3.mouse(this)[0]);
   
        let i = bisectDate(data, x0, 1);
        let d0 = data[i - 1];
        let d1 = data[i];
        let d = x0 - d0.date > d1.date - x0 ? d1 : d0;

        const parseDate = (d) => {
            const month = (d.getMonth() + 1).toString().length === 1 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
            const day = d.getDate().toString().length === 1 ? "0" + d.getDate().toString() : d.getDate();
            const year = d.getFullYear();
            return `${month}/${day}/${year}`
        }
        const x = xScale(d.date);
        const y = yScale(d.close);

        const xTargetRect = (x - 37.5) >= 0 ? (x - 37.5) : 0;
        const xTargetLabel = (x - 25) >= 12 ? (x - 25) : 12;
        
        svg.select(".close-price-container")
            .attr("transform", "translate(" + (xScale(xDomain[1])) + "," + (y - 7.5) + ")")
            .attr("width", `${textWidth[i] + 2}`)
            .attr("height", "14")
        svg.select(".close-price")
            .text(function() { return d.close.toFixed(2) })
            .attr("transform", "translate(" + (xScale(xDomain[1]) + 4) + "," + (y) + ")")
        svg.select(".target-date-container")
            .attr("transform", "translate(" + (`${xTargetRect}`) + "," + (350 + 5) + ")")
            .attr("width", "75")
            .attr("height", "14")
        svg.select(".target-date")
            .text(function() {return parseDate(d.date)})
            .attr("transform", "translate(" + (`${xTargetLabel}`) + "," + (350 + 5) + ")")
        focus.select('.x-hover-line')
            .attr('x1', x)
            .attr('y1', yScale(yDomain[0]))
            .attr('x2', x)
            .attr('y2', yScale(yDomain[1]));
        focus.select('.y-hover-line')
            .attr('x1', xScale(xDomain[0]))
            .attr('y1', y)
            .attr('x2', xScale(xDomain[1]))
            .attr('y2', y);
    }
}

export function drawChart(dataArr){

    const close = (d) => d.close.toFixed(2);
    const date = (d) => d.date;

    const svgWidth = 800;
    const svgHeight = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 18};
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const latestStockInformation = dataArr[0]
    const data = dataArr.reverse();

    const div = d3.select("#chart")
                    .append("div")
                    .classed("svg-container", true)

    const svg = div.append("svg")
                    .classed("svg-graph", true)
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0 850 400")
                    .append("g")
                        .attr("transform", "translate(" + margin.left + ", "+ margin.top + ")")

    const infoContainer = d3.select("#chart")
                            .append("div")
                            .classed("security-info", true)

    const xScale = d3.scaleTime().range([0, width]).domain(d3.extent([data[0].date, new Date()]));
    const yScale = d3.scaleLinear().range([height, 0]).domain(d3.extent(data, function(d){return d.close})).nice();

    const xDomain = xScale.domain();
    const yRange = yScale.domain();

    const line = d3.line()
                    .x(function(d){return xScale(d.date)})
                    .y(function(d){return yScale(d.close)})
    
    const textWidth = dummyElements(svg, data, close)

    svg.append("g")
        .attr('class', 'x-axis')
        .attr("transform", "translate(0, " + height + ")")
        .call(d3.axisBottom(xScale)
            .ticks(d3.timeDay.filter(d=>d3.timeDay.count(0, d) % 2 === 0))
            .tickFormat(d3.timeFormat('%m/%d'))
            .tickSizeOuter(0)
            // .tickFormat(function(d){
            //     const month = (d.getMonth() + 1).toString().length === 1 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
            //     const day = d.getDate().toString().length === 1 ? "0" + d.getDate().toString() : d.getDate();
            //     return `${month}-${day}`
            // })
            //      .tickPadding(8)
            .tickSize(-height)
            // .call(g => {
            //  })
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
                .attr('opacity, 0.3')
            // g.select(".domain")
            //     .attr('stroke', "none")
        })
   



    // const area = d3.area()
    //                 .x(function(d){return x(d.date);})
    //                 .y0(height)
    //                 .y1(function(d){return y(d.close);})

    svg.append("g")
        .attr('class', 'y-axis')
        .attr("transform", "translate(" + width +", "+ 0 + ")")
        .call(d3.axisRight(yScale)
            .tickFormat((d) => {
                return d3.format(".2f")(d)
            })
            .tickPadding(4)
            .tickSize(-width))
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
        

    // g.append("path")
    //     .datum(data)
    //     .attr("fill", "#000000")
    //     .attr("class", "area")
    //     .attr("d", area)

    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.0)
        .attr("d", line)
    toolTip(data, svg, width, height, margin, xScale, yScale, xDomain, yRange, textWidth)
}

