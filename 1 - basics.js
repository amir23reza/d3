/* --------------- d3 selections -------------------- */

//d3.select(".item").text("Mamad") -- selects the first element with the class name of `item`
//d3.selectAll(".item").text("Mamad") -- selects all the elements with the class name of `item`
//d3.select(".item:nth-child(3)").text("Mamad") -- selects the third element with the class name of `item`
//d3.selectAll(".item:nth-child(even)").text("Mamad") -- selects all the elements with the even index
//nth-child(4n) -- 4,8,12,16,...
//you don't need jQuery for selections because d3 is powerful enough to do so.

/* --------------- d3 selections -------------------- */

/** -------------- controlling HTML in d3 selections ------------------ */
//d3.select(".item").html("<strong>selected</strong>") -- changes the html content of the selected element
//d3.select(".item").append("div").html("<strong>appended</strong>") -- changes the html content of the element appended to the selected element
//d3.select(".item").remove() -- removes the selected element
//d3.select("#chart").insert("div",":nth-child(6)").attr("class","item").html("Mamad") -- selects the element with the id of CharacterData, insert a div this element as it's 6th child element, creates a class named item for the new element, changes the html content of this element.

/** -------------- controlling HTML in d3 selections ------------------ */

/** -------------- Modifying attributes and CSS ----------------  */

//d3.select(".item").attr('class','item spec') -- if we use only spec, it will replace the initial class
//d3.select(".item").classed("spec", true) -- it is the same like above but the point is that "spec" won't replace "item"
//d3.select(".item:nth-child(3)").classed({
//     spec : true,
//     item : false,
//     bigger : true
// })
//direct-styling: //d3.select(".item:nth-child(3)").style({
//     background-color : 'red',
//     font-size : 20px,
// })

/** -------------- Modifying attributes and CSS ----------------  */

/** -------------- Binding data to the DOM in d3 -------------- */

// var customData = [ // the data we want to bind to our elements
//     {
//         width : "30",
//         color : "red",
//     },
//     {
//         width : "45",
//         color : "blue",
//     },
//     {
//         width : "20",
//         color : "yellow",
//     },
//     {
//         width : "63",
//         color : "green",
//     },
//     {
//         width : "99",
//         color : "orange",
//     },
// ]
// d3.selectAll(".item")
// .data(customData) // asign data to each element (with the same index)
// .style("background-color", (d)=>{
//     return d.color // use that data
// })
// .style("width",(d)=>{
//     return d.width + "%"
// })
// .style("color","white")


/** -------------- Binding data to the DOM in d3 -------------- */

/** -------------- SubSelections in d3 -------------- */

// I did comment out the items in my html
// Therefore I can add my names dynamically.
// var customData = [ // the data we want to bind to our elements
//     {
//         width : "30",
//         name : "Lucy",
//         color : "red",
//     },
//     {
//         width : "45",
//         name : "Amir",
//         color : "blue",
//     },
//     {
//         width : "20",
//         name : "Reza",
//         color : "yellow",
//     },
//     {
//         width : "63",
//         name : "Mona",
//         color : "green",
//     },
//     {
//         width : "99",
//         name : "Neda",
//         color : "orange",
//     },
// ]

// d3.select("#chart")
// .selectAll('div') // we are selecting the divs that we have not created yet. and this is something we can do by the enter() of d3. This is called sub selection.
// .data(customData)
// .enter().append('div')
// .classed("item",true)
// .text((data)=>{
//     return(data.name)
// })
// .style("background-color", (d)=>{
//     return d.color // use that data
// })
// .style("width",(d)=>{
//     return d.width + "%"
// })
// .style("color","white")

/** -------------- SubSelections in d3 -------------- */