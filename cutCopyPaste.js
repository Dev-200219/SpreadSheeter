let ctrlKey;
document.addEventListener('keydown', (e) => {
    ctrlKey = e.ctrlKey;
})

document.addEventListener('keyup', (e) => {
    ctrlKey = e.ctrlKey;
})

let selectedCells = [];
let selectedCellsData = [];
let copyBtn = document.querySelector('.copy-btn');
let cutBtn = document.querySelector('.cut-btn');
let pasteBtn = document.querySelector('.paste-btn');

for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
        let cell = document.querySelector("[rid = '" + i + "'][cid = '" + j + "']");

        cell.addEventListener('click', (e) => {
            if(!ctrlKey) return;

            if(selectedCells.length >= 2) {
                clearCellsUI();
                selectedCells = [];
                return;
            }

            cell.style.border = "3px solid #218c74";

            selectedCells.push([i, j]);
        })
    }
}

function clearCellsUI() {
    let[cell1, cell2] = selectedCells;
    
    if(cell1) {
        let cellElement = document.querySelector("[rid = '" + cell1[0] + "'][cid = '" + cell1[1] + "']");
        cellElement.style.border = '1px solid #dfe4ea';
    }
    
    if(cell2) {
        let cellElement = document.querySelector("[rid = '" + cell2[0] + "'][cid = '" + cell2[1] + "']");
        cellElement.style.border = '1px solid #dfe4ea';
    }
}

copyBtn.addEventListener('click', (e) => {
    if(!selectedCells || selectedCells.length != 2) {
        alert('Please select range of cells to copy');
        clearCellsUI();
        selectedCells = [];
        return;
    }

    for(let i = selectedCells[0][0]; i <= selectedCells[1][0]; i++) {
        let rowData = [];
        
        for(let j = selectedCells[0][1]; j <= selectedCells[1][1]; j++) {
            rowData.push({...sheetDB[i][j]});
        }

        selectedCellsData.push(rowData);
    }

    clearCellsUI();
})

pasteBtn.addEventListener('click', (e) => {
    if(selectedCells.length < 2) {
        alert('Select data to be pasted!!');
        clearCellsUI();
        selectedCells = [];
        return;
    }
    
    let cellAddress = addressBar.value;
    let {row, col} = getCellRowAndCol(cellAddress);

    for(let i = 0; i < selectedCellsData.length; i++) {
        for(let j = 0; j < selectedCellsData[i].length; j++) {
            let currCellRow = row + i;
            let currCellCol = col + j;
            
            if(currCellRow >= rows || currCellCol >= cols) continue;
            
            selectedCellsData[i][j].formula = "";
            selectedCellsData[i][j].parent = [];
            selectedCellsData[i][j].children = [];
            sheetDB[currCellRow][currCellCol] = selectedCellsData[i][j];
            let currCell = document.querySelector("[rid = '" + currCellRow + "'][cid = '" + currCellCol + "']");
            currCell.click();
        }
    }

    selectedCellsData = [];
    selectedCells = [];
})