import * as d3 from "d3";

export const elementHTML = () => {

    const div = d3.select("#chart")
        .append("div")
        .classed("svg-container", true)

    const s = div.append("svg")
        .classed("svg-graph", true)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 850 400")

    //Box Shadow
    const defs = d3.select(".svg-graph")
        .append("defs");
    const filter = defs.append("filter")
        .attr("id", "dropshadow");
    boxShadow(filter);
   
}

//Box Shadow for Legend
const boxShadow = (filter) => {

    filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 2.5)
        .attr("result", "blur");
    filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 1)
        .attr("dy", 1)
        .attr("result", "offsetBlur");
    filter.append("feFlood")
        .attr("in", "offsetBlur")
        .attr("flood-color", "black")
        .attr("flood-opacity", "0.4")
        .attr("result", "offsetColor");
    filter.append("feComposite")
        .attr("in", "offsetColor")
        .attr("in2", "offsetBlur")
        .attr("operator", "in")
        .attr("result", "offsetBlur");
    
    const feMerge = filter.append("feMerge")
    
    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur")
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");

}