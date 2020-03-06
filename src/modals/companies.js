import * as d3 from "d3";
export const companiesModal = (data) => {
    const title = d3.select("#title-option")
                    .text("Select A Stock")
    const selector = d3.select("#menu")
                        .style("display", "none")
                        .selectAll(".option")
                        .data(data.companies)
                        .enter().append("div")
                        .attr("class", "option")
                        .text(function(d) {return `${d.name} (${d.ticker})`})
                        .attr("value", function(d, i) {
                            return i
                        })

    d3.select(".dropdown")
        .on("mouseover", function(){
        d3.select(this)
            .style("cursor", "pointer");
        })
        .on("click", function(){
            d3.select("#menu")
                .classed("hidden", true)
                .style("display", "block")
        })
    const specifiedElement = document.getElementById('menu');
    const specifiedClassEle = document.getElementById("title-option");
    // console.log(specifiedClassEle)
    document.addEventListener('click', function(e){
        const isClickInside = specifiedElement.contains(event.target)
        const isClick = specifiedClassEle.contains(event.target)
        if (!isClickInside && !isClick){
            d3.select("#menu")
                .style("display", "none")
        }
    })
}
    
    