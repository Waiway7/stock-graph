import * as d3 from "d3";

//Creates elements to display security prices at the given day
export const legendLabels = (legend) => {
    
    legend.append("rect")
        .attr("class", "legend-container")
        .attr("width", 105)
        .attr("height", 85)
        .attr("fill", "white")
        .attr("rx", 2)
        .attr("ry", 2)
        .attr("transform", "translate(" + (10) + "," + (35) + ")")
        .attr("filter", "url(#dropshadow)")
        .attr("opacity", "0.7")

    legend.append("text").attr("class", "open")
    legend.append("text").attr("class", "open-label label")

    legend.append("text").attr("class", "close")
    legend.append("text").attr("class", "close-label label")
    
    legend.append("text").attr("class", "high")
    legend.append("text").attr("class", "high-label label")

    legend.append("text").attr("class", "low")
    legend.append("text").attr("class", "low-label label")
    
    legend.append("text").attr("class", "volume")
    legend.append("text") .attr("class", "volume-label label")

    legend.selectAll("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", "10")

    legend.selectAll(".label")
        .attr("font-weight", "200")
        .attr("fill", "#9A9A9A")

}

//Displays the current close price and company's ticker
export const tickerLabel = (ticker, widthCurrPrice, data, security) => {
    ticker.append("rect")
        .attr("class", "ticker-container")
        .attr("width", 31 + widthCurrPrice)
        .attr("height", 15)
        .attr("fill", "white")
        .attr("rx", 2)
        .attr("ry", 2)
        .attr("transform", "translate(" + (10) + "," + (10) + ")")
        .attr("filter", "url(#dropshadow)")
    ticker.append("text")
        .attr("class", "ticker-security")
        .attr("font-size", "10")
        .attr("font-family", "sans-serif")
        .text(`${security.ticker} ${data[data.length - 1].close}`)
        .attr("transform", "translate(" + (15) + "," + (21) + ")")
}

//Uses mouseover to display target security information and prices
export const target = (svg, focus, legend, dimensions, mousemove) => {
    svg.append("text")
        .attr("class", "close-price") 

    svg.append("rect")
        .attr('class', "target-date-container")
        .style("display", "none")
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("dy", "4em")

    svg.append("text")
        .attr("class", "target-date")  

    svg.append("rect")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
        .attr("class", "overlay")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .on("mouseover", function() { 
            focus.style("display", null); 
            legend.style("display", null); 
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
            svg.select(".close")
                .style("display",null)
        })
        .on("mouseout", function() { 
            focus.style("display", "none")
            legend.style("display", "none")
            svg.select(".close-price-container").style("display", "none")
            svg.select(".close-price").style("display", "none")
            svg.select(".target-date").style("display", "none")
            svg.select(".target-date-container").style("display", "none")
            svg.select(".close").style("display", "none")
        })
        .on("mousemove", mousemove);
}