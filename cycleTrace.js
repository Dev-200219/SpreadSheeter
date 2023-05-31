function delayForColorToSee() {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve();
        }, 1000)
    })
}

async function traceCycle(startPoint) {
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

    let response = await traceCycleDFS(startPoint[0], startPoint[1], visited, dfsVisited);
    return Promise.resolve(response);
}

async function traceCycleDFS(i, j, visited, dfsVisited) {
    visited[i][j] = true;
    dfsVisited[i][j] = true;

    let currCell = document.querySelector("[rid = '" + i + "'][cid = '" + j + "']");
    //using setTimeout to delay so that color changes in UI are actually visible
    currCell.style.backgroundColor = 'lightgreen';
    await delayForColorToSee();

    for(let c = 0; c < graph[i][j].length; c++) {
        let children = graph[i][j][c];
        let {row, col} = getCellRowAndCol(children);

        if(!visited[row][col]) {
            let isCycle = await traceCycleDFS(row, col, visited, dfsVisited);

            if(isCycle) {
                currCell.style.backgroundColor = 'transparent';
                await delayForColorToSee();
                return Promise.resolve(true);
            }
        }
        else if(visited[row][col] && dfsVisited[row][col]) {
            let cyclicCell = document.querySelector("[rid = '" + row + "'][cid = '" + col + "']");
            
            cyclicCell.style.backgroundColor = 'lightsalmon';
            await delayForColorToSee();
            cyclicCell.style.backgroundColor = 'transparent';
            await delayForColorToSee();
            
            currCell.style.backgroundColor = 'transparent';
            
            return Promise.resolve(true);
        }
    }

    dfsVisited[i][j] = false;
    return Promise.resolve(false);
}