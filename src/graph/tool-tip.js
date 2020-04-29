import * as d3 from "d3";
import {legendLabels, tickerLabel, target} from "./legend"

const toFixed = (number, decimals) => {
    var x = Math.pow(10, Number(decimals) + 1);
    return (Number(number) + (1 / x)).toFixed(decimals);
}

const dummyElements = (svg, data) => {
    const textWidth = [];
    svg.append('g')
        .selectAll('.dummyText')
        .data(data)
        .enter()
        .append("text")
        .attr("font-family","sans-serif")
        .attr("font-size", "12px")
        .text((d) => {return d})
        .each(function(d, i) {
            const width = this.getComputedTextLength();
            textWidth.push(width)
            this.remove()
        })
    return textWidth
}

export const toolTip = (data, dimensions, margin, xScale, yScale, xDomain, yDomain, textWidth, security) => {
    //Finds the given position of a date in the array
    const bisectDate = d3.bisector((d) => d.date).left
    //Elements to contain information
    const svg = d3.select(".graph")
    const tickerWidthLabel = dummyElements(svg, [security.ticker]);

    const focus = svg.append("g").attr("class", "focus").style("display", "none");
    const legend = svg.append("g").attr("class", "legend").style("display", "none")
   
    const ticker = svg.append("g").attr("class", "ticker")

    //Displays current security's information based on mouseover
    legendLabels(legend)

    //Ticker label and target price
    tickerLabel(ticker, Math.ceil(textWidth[textWidth.length - 1]), data, security)
        
    //Containers for crosshair 
    focus.append("line")
        .attr("class", "x-hover-line")

    focus.append("line")
        .attr("class", "y-hover-line")

    //Container for current/target close price
    svg.append("rect")
        .attr('class', "close-price-container")
        .style("display", "none")
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("dy", "4em")
    
    //Function that uses mouse movement to display target information
    target(svg, focus, legend, dimensions, mousemove)

    //Function that tracks mouse movement to display the target information
    function mousemove() {
        var x0 = xScale.invert(d3.mouse(this)[0]);
   
        let i = bisectDate(data, x0, 1);
        let d0 = data[i - 1];
        let d1 = data[i];
        let d = x0 - d0.date > d1.date - x0 ? d1 : d0;

        // console.log(d)

        const parseDate = (d) => {
            const month = (d.getMonth() + 1).toString().length === 1 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
            const day = d.getDate().toString().length === 1 ? "0" + d.getDate().toString() : d.getDate();
            const year = d.getFullYear();
            return `${month}/${day}/${year}`
        }
        const x = xScale(d.date);
        const y = yScale(d.close);

        const labelWidth = Math.ceil(Math.floor(textWidth[0] - 18) / 6) * 3
        const marginRight = labelWidth + 100 - 5 - 20

        const vol = d.volume / 1000000
        const volLabel = vol < 0 ? `${toFixed(vol, 2)}` : (vol >= 1000 ? `${toFixed(vol, 2)+"B"}` : `${toFixed(vol, 2)+"M"}`)
        const volWidth = vol >= 100 ? 4 : 0
        const tickerLengthCurr = parseInt(textWidth[i]) + parseInt(tickerWidthLabel);
        const xTargetRect = (x - 37.5) >= 0 ? (x - 37.5) : 0;
        const xTargetLabel = (x - 25) >= 12 ? (x - 25) : 12;

        legend.select(".open")
            .text(() => toFixed(d.open, 2))
            .attr("transform", "translate(" + marginRight + "," + 50 +")")
        legend.select(".open-label")
            .text("Open")
            .attr("transform", "translate(" + 20 + "," + 50 +")")
        legend.select(".high-label")
            .text("High")
            .attr("transform", "translate(" + 20 + "," + 65+")")
        legend.select(".high")
            .text(() => toFixed(d.high, 2))
            .attr("transform", "translate(" + marginRight + "," + 65 +")")
        legend.select(".low-label")
            .text("Low")
            .attr("transform", "translate(" + 20 + "," + 80 +")")
        legend.select(".low")
            .text(() => toFixed(d.low, 2))
            .attr("transform", "translate(" + marginRight + "," + 80 +")")   
        legend.select(".close-label")
            .text("Close")
            .attr("transform", "translate(" + 20 + "," + 95 +")")
        legend.select(".close")
            .text(() => toFixed(d.close, 2))
            .attr("transform", "translate(" + marginRight + "," + 95 +")")   
        legend.select(".volume-label")
            .text("Volume")
            .attr("transform", "translate(" + 20 + "," + 110 +")")
        legend.select(".volume")
            .text(volLabel)
            .attr("transform", "translate(" + (marginRight - 3 - volWidth) + "," + 110 +")")   
        legend.select(".legend-container")
            .attr("width", `${labelWidth + 105}`)
        d3.select(".ticker-security")
            .text(`${security.ticker} ${toFixed(d.close, 2)}`)

        d3.select(".ticker-container")
            .attr("width", tickerLengthCurr + 5)

        svg.select(".close-price-container")
            .attr("transform", "translate(" + (xScale(xDomain[1])) + "," + (y - 7.5) + ")")
            .attr("width", `${textWidth[i] + 2}`)
            .attr("height", "14")
        svg.select(".close-price")
            .text(function() { return toFixed(d.close, 2) })
            .attr("transform", "translate(" + (xScale(xDomain[1]) + 4) + "," + (y) + ")")
        svg.select(".target-date-container")
            .attr("transform", "translate(" + (`${xTargetRect}`) + "," + (335) + ")")
            .attr("width", "75")
            .attr("height", "14")
        svg.select(".target-date")
            .text(function() {return parseDate(d.date)})
            .attr("transform", "translate(" + (`${xTargetLabel}`) + "," + (335) + ")")
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

