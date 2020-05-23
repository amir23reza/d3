/**             PIE CHART             */

// const config = {
//     canvasWidth: 500,
//     canvasHeight: 500,
//     margin : 40
// }
// var radius = Math.min(config.canvasWidth, config.canvasHeight) / 2 - config.margin
// const pieData = [
//     {
//         brand: "apple",
//         share : 40,
//     }, 
//     {
//         brand: "samsung",
//         share : 51,
//     }, 
//     {
//         brand: "sony",
//         share : 9,
//     }, 
//     {
//         brand: "huawei",
//         share : 100,
//     }, 
//     {
//         brand: "LG",
//         share : 3,
//     }, 
// ]

// var pieColor = d3.scaleOrdinal()
//   .domain(pieData)
//   .range(["red", "blue", "green", "yellow", "brown"])

// var pie = d3.pie().value(data => {
//     return data.share
// })

// var arc = d3.arc().innerRadius(0).outerRadius(radius)

// d3.select("#chart").append('svg')
//     .attr('width' , config.canvasWidth)
//     .attr('height' , config.canvasHeight)
//     .append('g')
//     .attr("transform", "translate("+(config.canvasWidth/2)+","+(config.canvasHeight/2)+")")
//     .selectAll('path')
//     .data(pie(pieData))
//     .enter()
//     .append('g')
//     .attr('class', 'slice')
    
// d3.selectAll('g.slice')
//     .append('path')
//     .attr('fill' , (item, index)=> {
//         return pieColor(index)
//     })
//     .attr('d', arc)
//     .on('mouseover' , (item) =>{
//         console.log(item.data.share)
//     })

// d3.selectAll('g.slice')
//     .append('text')
//     .attr('text-anchor', 'middle')
//     .attr('fill', 'white')
//     .text((item)=>{
//         return item.data.brand
//     })
//     .attr('transform', (item) => {
//         return 'translate('+ arc.centroid(item) +')'
//     })
    
/**                FORCE LAYOUT - GRAPH                   */
var config = {
    canvasWidth: 1000,
    canvasHeight: 600,
    nodeWidth: 10
}

var nodes = [
    {
        name: "node 1",
        value : 1800
    },
    {
        name : "node 2",
        value : 1500
    },
    {
        name : "node 3",
        targets : [0], 
        value : 1200
    },
    {
        name : "node 4",
        targets : [1, 2],
        value : 1000
    },
    {
        name: "node 5",
        targets : [0,1,2,3],
        value : 1000
    }
]

var nodeRadiusScale = d3.scaleLinear().domain([0 , d3.max(nodes, (data=>{return data.value}))]).range([0 , 15])

var links = [];

nodes.map((node, source) => {
    if (node.targets !== undefined) {
        node.targets.map((target , index) => {
            links.push({"source" : source, "target": index})
        })
    }
})

var myChart = d3.select("#chart")
    .append('svg')
    .attr("width", config.canvasWidth)
    .attr("height" , config.canvasHeight)
// force layout
var simulation = d3.forceSimulation(nodes)
    .force("link" , d3.forceLink(links).distance(200))
    .force("charge", d3.forceManyBody().strength(-1000))
    .force("center", d3.forceCenter(config.canvasWidth / 2, config.canvasHeight / 2))
    .force("x", d3.forceX())
    .force("y", d3.forceY())

const drag = simulation => {

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
}
//link
var link = myChart
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", 1.5)
    .attr("stroke", "blue")
// node
var node = myChart.append("g")
    .attr("fill", "green")
    .selectAll("g")
    .data(nodes)
    .join("g")
    .call(drag(simulation))
node.append("circle")
    .attr("stroke", "green")
    .attr("stroke-width" , 1.5)
    .attr("r", data => {
        return nodeRadiusScale(data.value)
    })
node.append("text")
    .text(data => {
        return data.name
    })

simulation.on("tick", ()=> {
    node.select("circle")
    .attr("transform", data => {
        return "translate("+data.x+","+data.y+")"
    })
    node.select("text")
    .attr("transform", data => {
        return "translate("+(data.x - 10)+","+(data.y - 20)+")"
    })
    link.attr("x1", data=> {return data.source.x})
    link.attr("y1", data=> {return data.source.y})
    link.attr("x2", data=> {return data.target.x})
    link.attr("y2", data=> {return data.target.y})
})

