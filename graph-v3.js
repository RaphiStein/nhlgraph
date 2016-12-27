// TODO convert to ES6 

var width = 960,
    height = 600,
    radiusPlayer = 15,
    radiusTeam = 30;

var svg = d3.select("body").append("svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

var force;

d3.csv("nhldata-short.csv", function(data) {

    this._FORCE_LAYOUT_START_TIME = 0;
    
    var nodes = generateNodesAndLinks(data)[0];
    var links = generateNodesAndLinks(data)[1]; // TODO combine nodes and links   

    d3.layout.pack();

    force = d3.layout.force()
        .size([width, length])
        .nodes(nodes)
        .links(links)
        .gravity(.1)
        .alpha(0.01)
        .charge(function(d){ // negative values repulse, positive values attrace
            console.log("charge d: ", d);
            if (d.type == "TEAM"){
                return -30; // Repulse teams from eachother slightly
            }
            if (d.type == "PLAYER"){
                return -500; // repulse players from eachother as much as possible so they don't clump and become hard to read
            }
            else {
                throw "ERROR Node [ " + JSON.stringify(d)  + " ]  does not have a valid type"
            }
        })
        .friction(0.5) // a value of 1 corresponds to a frictionless environment, while a value of 0 freezes all particles in place.
        .linkDistance(50)
        .on('start', forceLayoutStart )
        .on('tick', forceLayoutTick );

    var link = svg.selectAll(".link")
    .data(links)
    .enter()
    .append('line')
        .attr('class', 'link');

    var node = svg.selectAll('.node')
        .data(nodes)
        .enter()
        .append('g')
            .attr('class', 'node')
            //.attr('r', 8)
            //.attr('cx', function(d, i){ return (i+1)*(width/4); })
            //.attr('cy', function(d, i){ return height/2; })
            .call(force.drag);

    /*            
    node.append('circle')
        //.attr('cx', function(d, i){ return (i+1)*(width/4); })
        //.attr('cy', function(d, i){ return height/2; })
        .attr('r', function(d) { if (d.type == "TEAM")  return radiusTeam; else return radiusPlayer  });
*/

  node.append("image")
      .attr("xlink:href", function(d) { return d.img || "teams/player.png";})
      .attr("x", -16)
      .attr("y", -16)
      .attr("width", function(d){ if (d.type == "TEAM") return radiusTeam; else return radiusPlayer} )
      .attr("height", function(d){ if (d.type == "TEAM") return radiusTeam; else return radiusPlayer} );

    node.append("text")
        .filter(function(d) { return d.type == "PLAYER" })
        .text(function(d) { return d.name })
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


    function forceLayoutStart(){
        console.log("Starting Force Layout Graph...");
    }

    function forceLayoutTick(startTime){
            
            node.attr("transform", function(d) {
                    
                d.x = Math.max(radiusPlayer, Math.min(width - radiusPlayer, d.x)); 
                d.y = Math.max(radiusPlayer, Math.min(height - radiusPlayer, d.y));

                if (d.y < 0 && d.type == "TEAM"){
                    d.y = 0 + radiusTeam;
                }
                return "translate(" + d.x + "," + d.y + ")"; 
            });

            link
                .attr('x1', function(d){ return d.source.x; })
                .attr('y1', function(d){ return d.source.y; })
                .attr('x2', function(d){ return d.target.x; })
        
                .attr('y2', function(d){ return d.target.y; });
    };
 
});

function generateNodesAndLinks(data){
    var nodes = [];
    var links = [];

     // 30 name Nodes hardcoded
    var teamNodes = [
        {
            name: "ANA",
            type: "TEAM",
            img: "teams/ANA.png",
            fixed: true
        },
        {
            name: "BOS",
            type: "TEAM",
            img: "teams/BOS.png",
            fixed: true
        },
        {
            name: "BUF",
            type: "TEAM",
            img: "teams/BUF.png",
            fixed: true
        },
        {
            name: "CGY",
            type: "TEAM",
            img: "teams/CGY.png",
            fixed: true
        },
        {
            name: "CAR",
            type: "TEAM",
            img: "teams/CAR.png",
            fixed: true
        },
        {
            name: "CHI",
            type: "TEAM",
            img: "teams/CHI.png",
            fixed: true
        },
        /*
        {
            name: "COL",
            type: "TEAM",
            img: "teams/COL.png",
            fixed: true
        },
        {
            name: "CBJ",
            type: "TEAM",
            img: "teams/CLB.png",
            fixed: true
        },
        {
            name: "DAL",
            type: "TEAM",
            img: "teams/DAL.png",
            fixed: true
        },
        */
        {
            name: "DET",
            type: "TEAM",
            img: "teams/DET.png",
            fixed: true
        },
        /*
        {
            name: "EDM",
            type: "TEAM",
            img: "teams/EDM.png",
            fixed: true
        },
        {
            name: "FLA",
            type: "TEAM",
            img: "teams/FLA.png",
            fixed: true
        },
        {
            name: "LAK",
            type: "TEAM",
            img: "teams/LAK.png",
            fixed: true
        },
        {
            name: "MIN",
            type: "TEAM",
            img: "teams/MIN.png",
            fixed: true
        },
        {
            name: "MTL",
            type: "TEAM",
            img: "teams/MTL.png",
            fixed: true
        },
        {
            name: "NSH",
            type: "TEAM",
            img: "teams/NSH.png",
            fixed: true
        },
        {
            name: "NJD",
            type: "TEAM",
            img: "teams/NJD.png",
            fixed: true
        },
        */
        {
            name: "NYI",
            type: "TEAM",
            img: "teams/NYI.png",
            fixed: true
        },
        {
            name: "NYR",
            type: "TEAM",
            img: "teams/NYR.png",
            fixed: true
        },
        {
            name: "OTT",
            type: "TEAM",
            img: "teams/OTT.png",
            fixed: true
        },
        {
            name: "PHI",
            type: "TEAM",
            img: "teams/PHI.png",
            fixed: true
        },
        {
            name: "PHX",
            type: "TEAM",
            img: "teams/PHX.png",
            fixed: true
        },
        {
            name: "PIT",
            type: "TEAM",
            img: "teams/PIT.png",
            fixed: true
        },
        {
            name: "SJS",
            type: "TEAM",
            img: "teams/SJS.png",
            fixed: true
        },
        {
            name: "STL",
            type: "TEAM",
            img: "teams/STL.png",
            fixed: true
        },
        {
            name: "TBL",
            type: "TEAM",
            img: "teams/TBL.png",
            fixed: true
        },
        /*
        {
            name: "TOR",
            type: "TEAM",
            img: "teams/TOR.png",
            fixed: true
        },
        {
            name: "VAN",
            type: "TEAM",
            img: "teams/VAN.png",
            fixed: true
        },
        {
            name: "WSH",
            type: "TEAM",
            img: "teams/WSH.png",
            fixed: true
        },
        {
            name: "WPG",
            type: "TEAM",
            img: "teams/WPG.png",
            fixed: true
        }
        */
    ]
    nodes = nodes.concat(teamNodes);

    // create nodes and links
    for(var i = 0; i <  data.length; i++){
        var node = {};
        node["name"] = data[i].Player;
        node["type"] = "PLAYER";
        //node["x"] = width/2;
        //node["y"] = height/2;
        nodes.push(node);

        var link = {};
        link["source"] = nodes.length - 1;
        link["target"] = getIndexOfTeam(data[i].team_id);
        links.push(link);
    }

    return [nodes, links];

       function getIndexOfTeam(team){
        for (var i = 0; i < nodes.length; i++){
            if (nodes[i].name == team){
                return i;
            }
        }
        throw "TEAM " + team + " DOES NOT EXIST!"
    }
}