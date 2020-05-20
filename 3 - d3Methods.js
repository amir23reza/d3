// const barData = [
//     {
//         value: 35,
//         color: "blue",
//     },
//     {
//         value: 21,
//         color: "red",
//     },
//     {
//         value: 15,
//         color: "green",
//     },
//     {
//         value: 56,
//         color: "yellow",
//     },
//     {
//         value: 6,
//         color: "blue",
//     },
//     {
//         value: 62,
//         color: "red",
//     },
//     {
//         value: 31,
//         color: "green",
//     },
//     {
//         value: 14,
//         color: "yellow",
//     },
//     {
//         value: 45,
//         color: "blue",
//     },
//     {
//         value: 27,
//         color: "red",
//     },
//     {
//         value: 54,
//         color: "green",
//     },
//     {
//         value: 2,
//         color: "yellow",
//     },
//     {
//         value: 31,
//         color: "green",
//     },
//     {
//         value: 14,
//         color: "yellow",
//     },
//     {
//         value: 45,
//         color: "blue",
//     },
// ]

// const config = {
//     svgWidth: 1000,
//     svgHeight: 500,
//     barWidth: 25,
//     offset: 5
// }

// var tooltip = d3.select('body').append('div')
//     .attr('class', 'tooltip')

// // y-scale
// var yScale = d3.scaleLinear().domain([0,d3.max(barData, (item)=>{return item.value})]).range([0, 500])

// // x-scale
// var xScale = d3.scaleBand().range([0, config.svgWidth]).padding(0.04) // padding  is a number between 0 to 1. the bigger padding is, the thinner our bars are.
// xScale.domain(barData.map((item, index) => {return index}))

// // color scaling : 1 - Vertical Coloring
// var verticalColorScale = d3.scaleLinear().domain([0,d3.max(barData, (item)=>{return item.value})]).range(['#F1C40F','#C0392B'])
// // color scaling : 2 - Horizontal Coloring
// var horizontalColorScale = d3.scaleLinear().domain([0, barData.length*.33 , barData.length*.66 , barData.length]).range(['#27AE60','#2C3E50', '#8E44AD', '#2980B9'])

// var visual = d3.select('#chart')
//     .append("svg")
//             .attr("width", config.svgWidth)
//             .attr("height", config.svgHeight)
//             //.style("background", "#FFF")
//         .selectAll("rect")
//             .data(barData)
//             .enter()
//             .append('rect')
//             .attr("width", xScale.bandwidth())
//             .attr("height", (item)=>{
//                 return 0
//             })
//             .attr("fill", (item, index)=>{
//                 //return verticalColorScale(item.value) -- vertical
//                 return horizontalColorScale(index) // -- horizontal
//             })
//             .attr("x", (item, index) => {
//                 // return index * (config.barWidth + config.offset) 
//                 return xScale(index)
//             })
//             .attr("y", (item)=> {
//                 return config.svgHeight
//             })
//             // how to add events to our d3 elements
//             .on('mouseover' , function(data){ // don't  use arrow function, so that you can use this. 
//                 console.log(d3.event.pageY, d3.event.pageX)
//                 tooltip.transition().style("opacity",.99)
                
//                 tooltip.html(data.value)
//                 .style("left", d3.event.pageX - 15+ "px")
                
//                 tooltip
//                 .style("top", d3.event.pageY+"px")

//                 d3.select(this)
//                 .style("opacity", .3)
//             })
//             .on('mouseout', function(data){
//                 d3.select(this)
//                 .style("opacity", 1)
//                 .style("cursor","auto")
//             })
// // d3 animation and transition
// visual.transition()
//     .attr("height", (item)=>{
//         return yScale(item.value)
//     })
//     .attr("y", (item)=> {
//         return config.svgHeight - yScale(item.value)
//     })
//     .duration(1000)
//     .delay((item, index)=>{
//         return index * 20
//     })
//     .ease(d3.easeElastic)
