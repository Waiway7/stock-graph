import * as d3 from "d3";
import {retreiveSecurityData} from "../data/retreive_security_data"
export const companiesModal = (data) => {

    d3.select(".company-name")
        .text("Apple (AAPL)")
    
    let companies = [];


    const title = d3.select("#title-option")
                    .text("Companies")
    const selector = d3.select("#menu")
                        .style("display", "none")
                        .attr("value", "")
                        .selectAll(".option")
                            .data(data.companies)
                        .enter()
                            .append("div")
                        .attr("class", "option")
                            .text(function(d) {return `${d.name}`})
                            .attr("value", function(d, i) {
                                return d.ticker
                            })

    const specifiedElement = document.getElementById('menu');
    const specifiedClassEle = document.getElementById("title-option");

    d3.select(".dropdown")
        .on("mouseover", function(){
        d3.select(this)
            .style("cursor", "pointer");
        d3.select(".plus")
            .style("color", "#0081f2")
        d3.select("#title-option")
            .style("color", "#0081f2")
        document.getElementsByClassName("plus-container")[0].style.border = "1px solid #0081f2";
        })
        .on("mouseout", function(d, i){
            d3.select(".plus")
                .style("color", "black")
            document.getElementsByClassName("plus-container")[0].style.border = "1px solid black";
            d3.select("#title-option")
                .style("color", "black")
        })
        .on("click", function(){
            if (getComputedStyle(specifiedElement).getPropertyValue("display") == "none"){
                d3.select("#menu")
                    .style("display", "block")
                d3.select(".plus")
                    .style("color", "#0081f2")
                document.getElementsByClassName("plus-container")[0].style.border = "1px solid #0081f2";
                d3.select("#triangle")
                    .style("display", "block")
                d3.select("#inner-tri")
                    .style("display", "block")
                d3.select(".svg-container")
                    .style("dropdown", "-1")
            }
            else {
                d3.select("#menu")
                    .style("display", "none")
                d3.select("#triangle")
                    .style("display", "none")
                d3.select("#inner-tri")
                    .style("display", "none")
                d3.select(".plus")
                    .style("color", "black")
                d3.select("#title-option")
                    .style("color", "black")
                document.getElementsByClassName("plus-container")[0].style.border = "1px solid black";
            }
        })

    
   
    // console.log(specifiedClassEle)
    const dropDown = document.getElementsByClassName("dropdown")[0];
    document.addEventListener('click', function(e){
        const isClickInside = specifiedElement.contains(e.target);
        const isClick = specifiedClassEle.contains(e.target);
        
        if (!isClickInside && !isClick){
            d3.select("#menu")
                .style("display", "none")
            d3.select(".plus")
                .style("color", "black")
            d3.select("#triangle")
                .style("display", "none")
            d3.select("#inner-tri")
                .style("display", "none")
            document.getElementsByClassName("plus-container")[0].style.border = "1px solid black";
        }
    })
    const options = document.getElementsByClassName("option");
    for (let i = 0; i < options.length; i++){
        options[i].addEventListener('click', function(e){
            d3.select(".company-name")
                        .text(options[i].textContent)
           retreiveSecurityData(options[i].getAttribute('value'));
        })

        options[i].addEventListener('mouseover', function(e){
            e.target.style.backgroundColor = "#cce5ff";
        })

        options[i].addEventListener('mouseout', function(e){
            e.target.style.backgroundColor = "white";
        })
    }

}
    
    