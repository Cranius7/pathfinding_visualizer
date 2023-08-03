function Dijkstra(startNode, endNode){
    let openSet=[];
    let closedSet=[];
    let path=[];
    let visitedNodes=[];

    openSet.push(startNode);
    while(openSet.length>0)
    {
        let leastIndex=0;
        for(let i=0; i<openSet.length;i++)
        {
            if(openSet[i].f< openSet[leastIndex].f){
                leastIndex=i;
            }
        }  

        let current = openSet[leastIndex];
        visitedNodes.push(current);

        if(current === endNode){
            let temp=current;
            path.push(temp);
            while(temp.previous){
                path.push(temp.previous);
                temp = temp.previous;
            }
            console.log(path);
            return {path, visitedNodes};
        }

        openSet = openSet.filter((elt) => elt!== current );
        closedSet.push(current);

        let neighbours = current.neighbours;
        for(let i=0;i<neighbours.length;i++){
            let neighbour = neighbours[i];
            if(!closedSet.includes(neighbour) && neighbour.isBarrier===false){
                let tempG = current.g + 1+neighbour.isWall;
                let newPath = false;
                if(openSet.includes(neighbour)){
                    if(tempG < neighbour.g){
                        neighbour.g=tempG;
                        newPath=true;
                    }
                }
                else{
                    neighbour.g=tempG;
                    newPath=true;
                    openSet.push(neighbour);
                }
                if(newPath){
                    neighbour.h= heuristic(neighbour, endNode);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.previous = current;
                }    
            }
        }
    }

    return {path,visitedNodes, error:"No Path Found!"};
}

function heuristic(a,b)
{
    return 0;
}

export default Dijkstra;