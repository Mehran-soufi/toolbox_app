import { metroLines } from "./lines";
import { MetroEdge } from "./types";


export const metroGraph = new Map<
  string,
  {
    station: string;
    lineId: number;
    neighbors: MetroEdge[];
  }
>();



// ===============================
// Create Nodes
// ===============================

metroLines.forEach((line)=>{


  line.paths.forEach((path)=>{


    path.stations.forEach((station)=>{


      const key =
        `${station}-${line.id}`;


      if(!metroGraph.has(key)){

        metroGraph.set(key,{
          station,
          lineId: line.id,
          neighbors:[]
        });

      }


    });


  });


});





// ===============================
// Connect stations inside paths
// ===============================


metroLines.forEach((line)=>{


  line.paths.forEach((path)=>{


    for(
      let i = 0;
      i < path.stations.length - 1;
      i++
    ){


      const current =
        `${path.stations[i]}-${line.id}`;


      const next =
        `${path.stations[i+1]}-${line.id}`;




      metroGraph
      .get(current)
      ?.neighbors
      .push({

        node:{
          station:path.stations[i+1],
          lineId:line.id
        },

        cost:1,

        lineId:line.id

      });





      metroGraph
      .get(next)
      ?.neighbors
      .push({

        node:{
          station:path.stations[i],
          lineId:line.id
        },

        cost:1,

        lineId:line.id

      });



    }


  });


});






// ===============================
// Connect different paths
// Same line branches
// ===============================


const lineStations =
new Map<
string,
number[]
>();



metroLines.forEach((line)=>{


  line.paths.forEach((path)=>{


    path.stations.forEach((station)=>{


      if(!lineStations.has(station)){

        lineStations.set(
          station,
          []
        );

      }


      const ids =
      lineStations.get(station)!;


      if(
        !ids.includes(line.id)
      ){

        ids.push(line.id);

      }


    });


  });


});






// ===============================
// Line changes
// ===============================


lineStations.forEach(
(lines,station)=>{


  if(lines.length < 2)
    return;



  lines.forEach(
    fromLine=>{


    lines.forEach(
      toLine=>{


      if(fromLine === toLine)
        return;



      metroGraph
      .get(
        `${station}-${fromLine}`
      )
      ?.neighbors
      .push({

        node:{
          station,
          lineId:toLine
        },


        // تغییر خط هزینه دارد
        cost:5,


        lineId:toLine

      });



    });


  });



});