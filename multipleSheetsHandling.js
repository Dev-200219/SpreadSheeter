let sheetAddBtn = document.querySelector('.add-icon');
let allSheetsContainer = document.querySelector('.sheet-folder-cont');

sheetAddBtn.addEventListener('click', (e) => {
    let sheet = document.createElement('div');
    sheet.classList.add('sheet-folder');

    let allSheetFolders = document.querySelectorAll('.sheet-folder');
    sheet.setAttribute('id', allSheetFolders.length);

    sheet.innerHTML = `
        <div class="sheet-content">Sheet ${allSheetFolders.length + 1}</div>
    `
    allSheetsContainer.appendChild(sheet);
    createPropertySetForSingleSheet();
    createGraphForSingleSheet();
    handleSheetActiveness(sheet);
    handleSheetRemoval(sheet);
    sheet.click();
})

function handleSheetRemoval(sheet) {
    sheet.addEventListener('dblclick', (e) => {
        let allSheetFolders = document.querySelectorAll('.sheet-folder');

        if(allSheetFolders.length == 1) {
            alert('There must be atleast one sheet!!')
            return;
        }

        let response = confirm('Are you sure, You want to delete this sheet?');
        if(!response) return;

        let sheetIdx = Number(sheet.getAttribute('id'));
        //DB and Graph removal
        allSheetsDB.splice(sheetIdx, 1);
        allSheetsGraph.splice(sheetIdx, 1);
        
        //UI removal
        sheet.remove();

        updateSheetIndexes();
    })
}

function updateSheetIndexes() {
    let allSheetFolders = document.querySelectorAll('.sheet-folder');

    for(let i = 0; i < allSheetFolders.length; i++) {
        allSheetFolders[i].setAttribute('id', i);
        let sheetContent = allSheetFolders[i].querySelector('.sheet-content');
        sheetContent.innerText = `Sheet ${i + 1}`;
    }

    allSheetFolders[0].click();
}

function handleSheetActiveness(sheet) {
    sheet.addEventListener('click', () => {
        let sheetIdx = Number(sheet.getAttribute('id'));
        sheetDB = allSheetsDB[sheetIdx];
        graph = allSheetsGraph[sheetIdx];
        handleSheetCellProp();
        activeSheetUI(sheet);
    })
}

function activeSheetUI(sheet) {
    let allSheets = document.querySelectorAll('.sheet-folder');
    
    allSheets.forEach((sheet) => {
        sheet.style.backgroundColor = 'transparent';
    })

    sheet.style.backgroundColor = '#ced6e0'
}

function handleSheetCellProp() {
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            let cell = document.querySelector("[rid = '" + i + "'][cid = '" + j + "']");
            cell.click();
        }
    }

    let firstCell = document.querySelector('.cell');
    firstCell.click();
}

function createGraphForSingleSheet() {
    let graph = [];

    for(let i = 0; i < rows; i++) {
        let row = [];
        for(let j = 0; j < cols; j++) {
            row.push([]);
        }

        graph.push(row);
    }

    allSheetsGraph.push(graph);
}

function createPropertySetForSingleSheet() {
    let sheetDB = [];
    
    //Storage using 2D Matrix and object for each cell
    for(let i = 0; i < rows; i++) {
        let rowSheet = [];
        for(let j = 0; j < cols; j++) {
            let prop = {
                isBold : false,
                isItalic : false,
                isUnderline : false,
                alignment : "left",
                fontFamily : "arial",
                fontSize : 14,
                textColor : "#000000",
                cellColor : null,
                value : "",
                formula : "",
                children : [],
                parent : []
            }

            rowSheet.push(prop);
        }

        sheetDB.push(rowSheet);
    }

    allSheetsDB.push(sheetDB);
}