var svg = d3.select("#graph").append("svg"),
    width = 960,
    height = 600;

svg.attr("width", width);
svg.attr("height", height);

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    //.force("charge", d3.forceManyBody().strength(10))
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.csv("nhldata-short.csv", function(data) {

    var nodes = [];
    var links = []; // TODO combine nodes and links   

    // 30 name Nodes hardcoded
    var teamNodes = [
        {
            name: "ANA"
        },
        {
            name: "BOS"
        },
        {
            name: "BUF"
        },
        {
            name: "CGY"
        },
        {
            name: "CAR"
        },
        {
            name: "CHI"
        },
        {
            name: "COL"
        },
        {
            name: "CBJ"
        },
        {
            name: "DAL"
        },
        {
            name: "DET"
        },
        {
            name: "EDM"
        },
        {
            name: "FLA"
        },
        {
            name: "LAK"
        },
        {
            name: "MIN"
        },
        {
            name: "MTL"
        },
        {
            name: "NSH"
        },
        {
            name: "NJD"
        },
        {
            name: "NYI"
        },
        {
            name: "NYR"
        },
        {
            name: "OTT"
        },
        {
            name: "PHI"
        },
        {
            name: "PHX"
        },
        {
            name: "PIT"
        },
        {
            name: "SJS"
        },
        {
            name: "STL"
        },
        {
            name: "TBL"
        },
        {
            name: "TOR"
        },
        {
            name: "VAN"
        },
        {
            name: "WSH"
        },
        {
            name: "WPG"
        }
    ]
    nodes = nodes.concat(teamNodes);

    // create nodes
    for(var i = 0; i <  data.length; i++){
        var node = {};
        node["name"] = data[i].Player;
        nodes.push(node);
    }

    console.log(nodes);


    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter()
            .append("circle")
            .attr("r", 4)
            .attr("fill", function(d) { return color(d.group); })
        /*
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));*/

      simulation
        .nodes(nodes)
        .on("tick", ticked);



   function ticked() {
       /*
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
        */

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }
   
});