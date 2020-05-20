var barData = [];
const margin = {
    top: 25,
    left: 40,
    bottom: 25,
    right: 40,
}
const config = {
    svgWidth: 1000 - (margin.left + margin.right),
    svgHeight: 500 - (margin.top + margin.bottom),
    barWidth: 25,
    offset: 5
}

var tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')

d3.json("https://www.quandl.com/api/v3/datatables/ZACKS/MT.json?api_key=uq7UyaJER-8dwrbBzwKG").then(data => {
    barData = data.datatable.data;
    // y-scale
    var yScale = d3.scaleLinear().domain([0, d3.max(barData, (item) => { return item[9] })]).range([0, config.svgHeight])

    // x-scale
    var xScale = d3.scaleBand().range([0, config.svgWidth]).padding(0.15) // padding  is a number between 0 to 1. the bigger padding is, the thinner our bars are.
    xScale.domain(barData.map((item, index) => { return index }))

    // color scaling : 1 - Vertical Coloring
    var verticalColorScale = d3.scaleLinear().domain([0, d3.max(barData, (item) => { return item[9] })]).range(['#F1C40F', '#C0392B'])
    // color scaling : 2 - Horizontal Coloring
    var horizontalColorScale = d3.scaleLinear().domain([0, barData.length * .33, barData.length * .66, barData.length]).range(['#27AE60', '#2C3E50', '#8E44AD', '#2980B9'])

    var visual = d3.select('#chart')
        .append("svg")
        .attr("width", config.svgWidth + (margin.left + margin.right))
        .attr("height", config.svgHeight + (margin.top + margin.bottom))
        .append('g')// we will put all the chart in one group
        //.style("background", "#FFF")
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .selectAll("rect")
        .data(barData)
        .enter()
        .append('rect')
        .attr("width", xScale.bandwidth())
        .attr("height", (item) => {
            return 0
        })
        .attr("fill", (item, index) => {
            return verticalColorScale(item[9]) //-- vertical
            //return horizontalColorScale(index) // -- horizontal
        })
        .attr("x", (item, index) => {
            // return index * (config.barWidth + config.offset) 
            return xScale(index)
        })
        .attr("y", (item) => {
            return config.svgHeight
        })
        // how to add events to our d3 elements
        .on('mouseover', function (data) { // don't  use arrow function, so that you can use this. 
            tooltip.transition().style("opacity", .99)

            tooltip.html(data[2] + " : " + data[9])
                .style("left", d3.event.pageX - 30 + "px")

            tooltip
                .style("top", d3.event.pageY - 50 + "px")

            d3.select(this)
                .style("opacity", .3)
        })
        .on('mouseout', function (data) {
            tooltip.style("opacity", 0)
            d3.select(this)
                .style("opacity", 1)
                .style("cursor", "auto")
        })

    // d3 animation and transition
    visual.transition()
        .attr("height", (item) => {
            return yScale(item[9])
        })
        .attr("y", (item) => {
            return config.svgHeight - yScale(item[9])
        })
        .duration(1000)
        .delay((item, index) => {
            return index * 20
        })
        .ease(d3.easeElastic)

    ////////////////////////////////////// AXIS /////////////////////////////////////////////

    var axisScale = d3.scaleLinear().domain([0, d3.max(barData, (item) => { return item[9] })]).range([config.svgHeight, 0])
    var yAxis = d3.axisLeft().scale(axisScale) // 100 / 20 : 5 ,  
    d3.select('svg').append('g').call(yAxis)
        .style("transform", "translate(" + margin.left + "px, " + margin.top + "px)")

    xScale.domain(barData.map((item, index) => { return item[0] })) // the way to show the label of the barchart in the x-axis
    var xAxis = d3.axisBottom().scale(xScale)
    d3.select('svg').append('g').call(xAxis)
        .style("transform", "translate(" + margin.left + "px," + (config.svgHeight + margin.top) + "px)")
})

/////////////////////////////////// MARGIN ///////////////////////////////////
/***
 * 1- create margin object =>  var margin = {top: 25,left: 25,bottom: 25,right: 25}
 * 2- change the config like this => const config = {svgWidth: 1000 - (margin.top + margin.bottom),svgHeight: 500 - (margin.left + margin.right),barWidth: 25,offset: 5}
 * 3- when defining the width and height of the svg canvas we add the margin value back again :) => .attr("width", config.svgWidth + (margin.left + margin.right)).attr("height", config.svgHeight + (margin.top + margin.bottom))
 * 4- transle the chart group : .attr('transform','translate('+margin.left+','+margin.top+')')
 * 5- correct the margins in x-axis and y-axis =>  .style("transform","translate("+margin.left+"px, "+margin.top+"px)") , .style("transform", "translate("+margin.left+"px,"+(config.svgHeight+margin.top)+"px)")
 */


/////////////////////////////////// D3 CONVINIENCE METHODS FOR READING DATA FROM THE  OUTSIDE ///////////////////////////////////
// d3.json("file repository", (data)=>{

// })
// d3.json
// d3.csv
// d3.tsv
// d3.text
// d3.html