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

const toolTip = (data, svg, width, height, margin, xScale, yScale, xDomain, yDomain) => {

    const bisectDate = d3.bisector((d) => d.date).left
    const focus = svg.append("g")
                    .attr("class", "focus")
                    .style("display", "none");

                    
    focus.append("line")
        .attr("class", "x-hover-line")

    focus.append("line")
        .attr("class", "y-hover-line")

    focus.append("g")
        .attr("class", "close-price-container")
        .style("background-color", "#D3D3D3")
        .style('padding', 6)
        .append("text")
            .attr("class", "close-price")
            .style("fill", "#A9A9A9")
            .style("font-size", 12)
            .attr("dy", ".31em");

    svg.append("rect")
        .attr("transform", "translate(" + 0 + "," + margin.top + ")")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
        var x0 = xScale.invert(d3.mouse(this)[0]);
   
        let i = bisectDate(data, x0, 1);
        let d0 = data[i - 1];
        let d1 = data[i];
        let d = x0 - d0.date > d1.date - x0 ? d1 : d0;

        var x = xScale(d.date);
        var y = yScale(d.close);
        console.log(yDomain[0])

        focus.select(".close-price-container")
            .attr("transform", "translate(" + (xScale(xDomain[1]) + 10) + "," + (y) + ")")
        focus.select(".close-price")
            .text(function() { return d.close; })
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

    const svgWidth = 800;
    const svgHeight = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 18};
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

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

    const xScale = d3.scaleTime().range([0, width]).domain(d3.extent(data, function(d){return d.date})).nice();
    const yScale = d3.scaleLinear().range([height, 0]).domain(d3.extent(data, function(d){return d.close})).nice();

    const xDomain = xScale.domain();
    const yRange = yScale.domain();

    console.log(xDomain)
    const line = d3.line()
                    .x(function(d){return xScale(d.date)})
                    .y(function(d){return yScale(d.close)})
        

    svg.append("g")
        .attr('class', 'x-axis')
        .attr("transform", "translate(0, " + height + ")")
        .call(d3.axisBottom(xScale)
            .tickFormat(function(d){
                const month = (d.getMonth() + 1).toString().length === 1 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
                const day = d.getDate().toString().length === 1 ? "0" + d.getDate().toString() : d.getDate();
                if (month === 1 && day === 1){
                    return d.getFullYear()
                }
                return `${month}-${day}`
            })
                 .tickPadding(10)
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
            .tickPadding(10)
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
    toolTip(data, svg, width, height, margin, xScale, yScale, xDomain, yRange)
}

