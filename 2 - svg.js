// working with d3, we often prefer dealing with SVG instead of HTML.
//SVG : scalable vector graphics

/********************* Create a svg in d3 */
// d3.select("#chart")
//     .append("svg")
//             .attr("width","500")
//             .attr("height", "500")
//             .style("background", "#FFF")
//         .append("rect")
//             .attr("x", "100")
//             .attr("y", "100")
//             .attr("width", "200")
//             .attr("height", "200")
//             .attr("fill", "black")
//     d3.select("svg")
//         .append("circle")
//             .attr("cx","200") 
//             .attr("cy","200") 
//             .attr("fill","brown") 
//             .attr("r","100")
//     d3.select("svg")
//         .append("polyline")
//             .attr("points","200 100, 100 300, 300 300" )
//             .attr("fill","blue")



/************* Simple Bar Chart in D3 :) */

// const barData = [
//     {
//         value: 35,
//         color: "#AAAAAA",
//     },
//     {
//         value: 21,
//         color: "#BBBBBB",
//     },
//     {
//         value: 15,
//         color: "#CCCCCC",
//     },
//     {
//         value: 56,
//         color: "#DDDDDD",
//     },
// ]

// const config = {
//     svgWidth: 500,
//     svgHeight: 500,
//     barWidth: 25,
//     offset: 5
// }

// d3.select('#chart')
//     .append("svg")
//             .attr("width", config.svgWidth)
//             .attr("height", config.svgHeight)
//             .style("background", "#FFF")
//         .selectAll("rect")
//             .data(barData)
//             .enter()
//             .append('rect')
//             .attr("width", config.barWidth)
//             .attr("height", (item)=>{
//                 return item.value
//             })
//             .attr("fill", (item)=>{
//                 return item.color
//             })
//             .attr("x", (item, index) => {
//                 return index * (config.barWidth + config.offset) 
//             })
//             .attr("y", (item)=> {
//                 return config.svgHeight - item.value
//             })
    