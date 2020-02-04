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

    const svgWidth = 800;
    const svgHeight = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 18};
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const data = dataArr;

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
   

    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0])

    const line = d3.line()
                    .x(function(d){return x(d.date)})
                    .y(function(d){return y(d.close)})
   
    x.domain(d3.extent(data, function(d){return d.date})).nice()
        
    y.domain(d3.extent(data, function(d){return d.close})).nice();
        

    svg.append("g")
        .attr('class', 'x-axis')
        .attr("transform", "translate(0, " + height + ")")
        .call(d3.axisBottom(x)
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
        .call(d3.axisRight(y)
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

    const toolTip = svg.append("g");

    // svg.on("touchmove mousemove", () => {
    //     const {date, close}
    // })

    

    return svg.node()
}

