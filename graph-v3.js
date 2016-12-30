// TODO convert to ES6 

var width = 960,
    height = 600,
    radiusPlayer = 15,
    radiusTeam = 30;

var svg = d3.select("body").append("svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

var nodes;
var node;
var links;
var force;

d3.csv("nhldata-short.csv", function (data) {

    nodes = generateNodesAndLinks(data)[0];
    links = generateNodesAndLinks(data)[1]; // TODO combine nodes and links 

    draw();
});


function draw() {
    d3.layout.pack();

    force = d3.layout.force()
        .size([width, length])
        .nodes(nodes)
        .links(links)
        .gravity(.1)
        .alpha(0.01)
        .charge(function (d) { // negative values repulse, positive values attrace
            if (d.type == "TEAM") {
                return -30; // Repulse teams from eachother slightly
            }
            if (d.type == "PLAYER") {
                return -500; // repulse players from eachother as much as possible so they don't clump and become hard to read
            }
            else {
                throw "ERROR Node [ " + JSON.stringify(d) + " ]  does not have a valid type"
            }
        })
        .friction(0.5) // a value of 1 corresponds to a frictionless environment, while a value of 0 freezes all particles in place.
        .linkDistance(50)
        .on('start', forceLayoutStart)
        .on('tick', forceLayoutTick);

    var link = svg.selectAll(".link")
        .data(links);

    var linkEnter = link.enter()
        .append('line')
        .attr('class', 'link');

    link.exit().remove();

    nodes.filter(function(d){
            if (!('visible' in d)) return true;
            else return true;
    });

    node = svg.selectAll('.node')
        .data(nodes);

    node.exit().remove();

    var nodeEnter = node.enter()
        .append('g')
        .filter(function(d){
            if (!('visible' in d)) return true;
            else return d.visible;
        })
        .attr('class', 'node')
        .on("dblclick", clickOnTeam)
        //.attr('r', 8)
        //.attr('cx', function(d, i){ return (i+1)*(width/4); })
        //.attr('cy', function(d, i){ return height/2; })
        .call(force.drag);

    nodeEnter
        .append("image")
        .attr("xlink:href", function (d) { return d.img || "teams/player.png"; })
        .attr("x", -16)
        .attr("y", -16)
        .attr("width", function (d) { if (d.type == "TEAM") return radiusTeam; else return radiusPlayer })
        .attr("height", function (d) { if (d.type == "TEAM") return radiusTeam; else return radiusPlayer });

    nodeEnter
        .append("text")
        .filter(function (d) { return d.type == "PLAYER" })
        .text(function (d) { return d.name })
        .attr("class", "label")
        //.attr('cx', function(d, i){ return (i+1)*(width/4); })
        //.attr('cy', function(d, i){ return height/2; })
        .attr("dx", 0)
        .attr("dy", ".35em");

    console.log("nodes: ", nodes);
    console.log("links: ", links);

    ////////////////////////////
    force.start();
    ////////////////////////////

    function forceLayoutStart() {
        console.log("Starting Force Layout Graph...");
    }
    function forceLayoutTick(startTime) {
        node.attr("transform", function (d) {

            d.x = Math.max(radiusPlayer, Math.min(width - radiusPlayer, d.x));
            d.y = Math.max(radiusPlayer, Math.min(height - radiusPlayer, d.y));

            if (d.y < 0 && d.type == "TEAM") {
                d.y = 0 + radiusTeam;
            }
            return "translate(" + d.x + "," + d.y + ")";
        });

        link
            .attr('x1', function (d) { return d.source.x; })
            .attr('y1', function (d) { return d.source.y; })
            .attr('x2', function (d) { return d.target.x; })
            .attr('y2', function (d) { return d.target.y; });
    };

}


function clickOnTeam(d) {
    console.log("Deleting Team");
    d.visible = false;
    draw();

    /*
    // Find index of d
    for (var i = 0; i < nodes.length; i++) {
        if (d.name == nodes[i].name) {
            console.log("Node found at index " + i + " and removed");
            console.log("Removing node: ", d);
            nodes.splice(i, 1);
            draw();
            return;
        }
    }*/
}

function generateNodesAndLinks(data) {
    console.log("generateNodesAndLinks from ", data);
    var nodes = [];
    var links = [];

    // 30 name Nodes hardcoded
    var teamNodes = [
        {
            name: "ANA",
            type: "TEAM",
            img: "teams/ANA.png",
            visible: false,
            fixed: true
        },
        {
            name: "BOS",
            type: "TEAM",
            img: "teams/BOS.png",
            visible: false,
            fixed: true
        },
        {
            name: "BUF",
            type: "TEAM",
            img: "teams/BUF.png",
            visible: false,
            fixed: true
        },
        {
            name: "CGY",
            type: "TEAM",
            img: "teams/CGY.png",
            visible: false,
            fixed: true
        },
        {
            name: "CAR",
            type: "TEAM",
            img: "teams/CAR.png",
            visible: false,
            fixed: true
        },
        {
            name: "CHI",
            type: "TEAM",
            img: "teams/CHI.png",
            visible: false,
            fixed: true
        },
        {
            name: "COL",
            type: "TEAM",
            img: "teams/COL.png",
            visible: false,
            fixed: true
        },
        {
            name: "CBJ",
            type: "TEAM",
            img: "teams/CLB.png",
            visible: false,
            fixed: true
        },
        {
            name: "DAL",
            type: "TEAM",
            img: "teams/DAL.png",
            visible: false,
            fixed: true
        },
        {
            name: "DET",
            type: "TEAM",
            img: "teams/DET.png",
            visible: true,
            fixed: true
        },
        {
            name: "EDM",
            type: "TEAM",
            img: "teams/EDM.png",
            visible: false,
            fixed: true
        },
        {
            name: "FLA",
            type: "TEAM",
            img: "teams/FLA.png",
            visible: false,
            fixed: true
        },
        {
            name: "LAK",
            type: "TEAM",
            img: "teams/LAK.png",
            visible: false,
            fixed: true
        },
        {
            name: "MIN",
            type: "TEAM",
            img: "teams/MIN.png",
            visible: false,
            fixed: true
        },
        {
            name: "MTL",
            type: "TEAM",
            img: "teams/MTL.png",
            visible: false,
            fixed: true
        },
        {
            name: "NSH",
            type: "TEAM",
            img: "teams/NSH.png",
            visible: false,
            fixed: true
        },
        {
            name: "NJD",
            type: "TEAM",
            img: "teams/NJD.png",
            visible: false,
            fixed: true
        },
        {
            name: "NYI",
            type: "TEAM",
            img: "teams/NYI.png",
            visible: true,
            fixed: true
        },
        {
            name: "NYR",
            type: "TEAM",
            img: "teams/NYR.png",
            visible: false,
            fixed: true
        },
        {
            name: "OTT",
            type: "TEAM",
            img: "teams/OTT.png",
            visible: false,
            fixed: true
        },
        {
            name: "PHI",
            type: "TEAM",
            img: "teams/PHI.png",
            visible: false,
            fixed: true
        },
        {
            name: "PHX",
            type: "TEAM",
            img: "teams/PHX.png",
            visible: false,
            fixed: true
        },
        {
            name: "PIT",
            type: "TEAM",
            img: "teams/PIT.png",
            visible: false,
            fixed: true
        },
        {
            name: "SJS",
            type: "TEAM",
            img: "teams/SJS.png",
            visible: true,
            fixed: true
        },
        {
            name: "STL",
            type: "TEAM",
            img: "teams/STL.png",
            visible: false,
            fixed: true
        },
        {
            name: "TBL",
            type: "TEAM",
            img: "teams/TBL.png",
            visible: false,
            fixed: true
        },
        {
            name: "TOR",
            type: "TEAM",
            img: "teams/TOR.png",
            visible: false,
            fixed: true
        },
        {
            name: "VAN",
            type: "TEAM",
            img: "teams/VAN.png",
            visible: false,
            fixed: true
        },
        {
            name: "WSH",
            type: "TEAM",
            img: "teams/WSH.png",
            visible: false,
            fixed: true
        },
        {
            name: "WPG",
            type: "TEAM",
            img: "teams/WPG.png",
            visible: false,
            fixed: true
        }
    ]
    nodes = nodes.concat(teamNodes);

    // create nodes and links
    for (var i = 0; i < data.length; i++) {
        // Only create node/link for this player if his team is visible
        var indexOfTeam = getIndexOfTeam(data[i].team_id);
            
        var node = {};
        node["name"] = data[i].Player;
        node["type"] = "PLAYER";
        //node["x"] = width/2;
        //node["y"] = height/2;

        if (nodes[indexOfTeam].visible){
            node["visible"] = true;

            var link = {};
            link["source"] = nodes.length - 1; 
            link["target"] = indexOfTeam;
            links.push(link);
        }
        else {
            node["visible"] = false;
        }

        nodes.push(node);
    }

    return [nodes, links];

    function getIndexOfTeam(team) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].name == team) {
                return i;
            }
        }
        throw "TEAM " + team + " DOES NOT EXIST!"
    }
}