let allSheetsGraph = [];
let graph = [];

/*

for(let i = 0; i < rows; i++) {
    let row = [];
    for(let j = 0; j < cols; j++) {
        row.push([]);
    }

    graph.push(row);
}
*/

//true -> cycle is present
//false -> cycle is absent
function isGraphCyclic(graph) {
    let visited = [];
    let dfsVisited = [];
    
    for(let i = 0; i < rows; i++) {
        let visRow = [];
        let dfsVisRow = [];
        for(let j = 0; j < cols; j++) {
            visRow.push(false);
            dfsVisRow.push(false);
        }
        
        visited.push(visRow);
        dfsVisited.push(dfsVisRow);
    }

    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            //checking cycle for each component
            if(!visited[i][j]) {
                let response =  dfs(graph, i, j, visited, dfsVisited);

                if(response) return response;
            }
        }
    }
    
    return false;
}

//true -> cycle is present
//false -> cycle is absent
function dfs(graph, i, j, visited, dfsVisited) {
    visited[i][j] = true;
    dfsVisited[i][j] = true;

    for(let c = 0; c < graph[i][j].length; c++) {
        let children = graph[i][j][c];
        let {row, col} = getCellRowAndCol(children);

        if(!visited[row][col]) {
            let response = dfs(graph, row, col, visited, dfsVisited);
            
            if(response) return response;
        }
        else if(visited[row][col] && dfsVisited[row][col]) {
            return [row, col];
        }
    }

    dfsVisited[i][j] = false;
    return false;
}