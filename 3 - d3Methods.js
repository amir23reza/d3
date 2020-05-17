// scales : 
// we have some types of scales in d3: 
// Continuous Scales : Map a continuous, quantitative domain to a continuous range.
// Sequential Scales : Map a continuous, quantitative domain to a continuous, fixed interpolator.
// Diverging Scales : Map a continuous, quantitative domain to a continuous, fixed interpolator.
// Quantize Scales : Map a continuous, quantitative domain to a discrete range.
// Ordinal Scales : Map a discrete domain to a discrete range.


//below is linear scaling
const barData = [
    {
        value: 35,
        color: "blue",
    },
    {
        value: 21,
        color: "red",
    },
    {
        value: 15,
        color: "green",
    },
    {
        value: 56,
        color: "yellow",
    },
]

const config = {
    svgWidth: 500,
    svgHeight: 500,
    barWidth: 25,
    offset: 5
}
var barValues = []
barData.map(item => {
    barValues.push(item.value)
})
console.log(barValues)
var yScale = d3.scaleLinear().domain([0,d3.max(barValues)]).range([0, 500])

d3.select('#chart')
    .append("svg")
            .attr("width", config.svgWidth)
            .attr("height", config.svgHeight)
            .style("background", "#FFF")
        .selectAll("rect")
            .data(barData)
            .enter()
            .append('rect')
            .attr("width", config.barWidth)
            .attr("height", (item)=>{
                return yScale(item.value)
            })
            .attr("fill", (item)=>{
                return item.color
            })
            .attr("x", (item, index) => {
                return index * (config.barWidth + config.offset) 
            })
            .attr("y", (item)=> {
                return config.svgHeight - yScale(item.value)
            })