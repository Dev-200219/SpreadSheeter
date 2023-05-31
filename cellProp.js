let allSheetsDB = [];
let sheetDB = [];

for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
        let cell = document.querySelector("[rid = '" + i + "'][cid = '" + j + "']");
        applyEventListenerOnCell(cell, i, j);
    }
}

function applyEventListenerOnCell(cell, i, j) {
    cell.addEventListener('click', (e) => {
        let address = `${String.fromCharCode(j + 65)}${i + 1}`;
        addressBar.value = address;
        let cellObj = sheetDB[i][j];

        //making changes to UI using the properties of the clicked cell
        boldBtn.style.backgroundColor = (cellObj.isBold) ? activeColorProp : inactiveColorProp;
        italicBtn.style.backgroundColor = (cellObj.isItalic) ? activeColorProp : inactiveColorProp;
        underlineBtn.style.backgroundColor = (cellObj.isUnderline) ? activeColorProp : inactiveColorProp;
        leftAlign.style.backgroundColor = (cellObj.alignment === 'left') ? activeColorProp : inactiveColorProp;
        centerAlign.style.backgroundColor = (cellObj.alignment === 'center') ? activeColorProp : inactiveColorProp;
        rightAlign.style.backgroundColor = (cellObj.alignment === 'right') ? activeColorProp : inactiveColorProp;
        fontFamilyInput.value = cellObj.fontFamily;
        fontSizeInput.value = cellObj.fontSize;
        textColorPicker.value = (cellObj.textColor) ? cellObj.textColor : "#000000";
        cellColorPicker.value = (cellObj.cellColor) ? cellObj.cellColor : "transparent";
        formulaBar.value = cellObj.formula;
        cell.innerText = cellObj.value;
    })
}

{
    let sheetAddBtn = document.querySelector('.add-icon');
    sheetAddBtn.click();
}

//to get correct row and column number of the clicked cell
function getCellRowAndCol(cellAddress) {
    let row = Number(cellAddress.substring(1)) - 1;
    let col = Number(cellAddress.charCodeAt(0)) - 65;
    return {row, col};
}

//to get correct cell element node from html
function getCellElement(row, col) {
    return document.querySelector("[rid = '" + row + "'][cid = '" + col + "']")
}

//Property Change Event Listeners

boldBtn.addEventListener('click', (e) => {
    let cellAddress = addressBar.value;
    
    if(cellAddress) {
        let {row, col} = getCellRowAndCol(cellAddress);
        let cellObj = sheetDB[row][col];
        let cell = getCellElement(row, col);
        
        if(cellObj.isBold) {
            cellObj.isBold = false;
            cell.style.fontWeight = 'normal'
            boldBtn.style.backgroundColor = inactiveColorProp;
        }
        else {
            cellObj.isBold = true;
            cell.style.fontWeight = 'bold'
            boldBtn.style.backgroundColor = activeColorProp;
        }
    }
})

italicBtn.addEventListener('click', (e) => {
    let cellAddress = addressBar.value;
    
    if(cellAddress) {
        let {row, col} = getCellRowAndCol(cellAddress);
        let cellObj = sheetDB[row][col];
        let cell = getCellElement(row, col);
        
        if(cellObj.isItalic) {
            cellObj.isItalic = false;
            cell.style.fontStyle = 'normal'
            italicBtn.style.backgroundColor = inactiveColorProp;
        }
        else {
            cellObj.isItalic = true;
            cell.style.fontStyle = 'italic'
            italicBtn.style.backgroundColor = activeColorProp;
        }
    }
})

underlineBtn.addEventListener('click', (e) => {
    let cellAddress = addressBar.value;
    
    if(cellAddress) {
        let {row, col} = getCellRowAndCol(cellAddress);
        let cellObj = sheetDB[row][col];
        let cell = getCellElement(row, col);
        
        if(cellObj.isUnderline) {
            cellObj.isUnderline = false;
            cell.style.textDecoration = ''
            underlineBtn.style.backgroundColor = inactiveColorProp;
        }
        else {
            cellObj.isUnderline = true;
            cell.style.textDecoration = 'underline'
            underlineBtn.style.backgroundColor = activeColorProp;
        }
    }
})

leftAlign.addEventListener('click', (e) => {
    let cellAddress = addressBar.value;
    
    if(cellAddress) {
        let {row, col} = getCellRowAndCol(cellAddress);
        let cellObj = sheetDB[row][col];
        let cell = getCellElement(row, col);
        
        cellObj.alignment = 'left';
        cell.style.textAlign = 'left';
        leftAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
    }
})

centerAlign.addEventListener('click', (e) => {
    let cellAddress = addressBar.value;
    
    if(cellAddress) {
        let {row, col} = getCellRowAndCol(cellAddress);
        let cellObj = sheetDB[row][col];
        let cell = getCellElement(row, col);
        
        cellObj.alignment = 'center';
        cell.style.textAlign = 'center';
        centerAlign.style.backgroundColor = activeColorProp;
        rightAlign.style.backgroundColor = inactiveColorProp;
        leftAlign.style.backgroundColor = inactiveColorProp;
    }
})

rightAlign.addEventListener('click', (e) => {
    let cellAddress = addressBar.value;
    
    if(cellAddress) {
        let {row, col} = getCellRowAndCol(cellAddress);
        let cellObj = sheetDB[row][col];
        let cell = getCellElement(row, col);
        
        cellObj.alignment = 'right';
        cell.style.textAlign = 'right';
        rightAlign.style.backgroundColor = activeColorProp;
        leftAlign.style.backgroundColor = inactiveColorProp;
        centerAlign.style.backgroundColor = inactiveColorProp;
    }
})

fontFamilyInput.addEventListener('change', (e) => {
    let cellAddress = addressBar.value;
    
    if(cellAddress) {
        let {row, col} = getCellRowAndCol(cellAddress);
        let cellObj = sheetDB[row][col];
        let cell = getCellElement(row, col);
        
        let fontFamily = fontFamilyInput.value;
        cellObj.fontFamily = fontFamily;
        cell.style.fontFamily = fontFamily;
    }
})

fontSizeInput.addEventListener('change', (e) => {
    let cellAddress = addressBar.value;
    
    if(cellAddress) {
        let {row, col} = getCellRowAndCol(cellAddress);
        let cellObj = sheetDB[row][col];
        let cell = getCellElement(row, col);
        
        let fontSize = fontSizeInput.value;
        cellObj.fontSize = fontSize;
        cell.style.fontSize = `${fontSize}px`;
    }
})

textColorPicker.addEventListener('input', (e) => {
    let cellAddress = addressBar.value;
    
    if(cellAddress) {
        let {row, col} = getCellRowAndCol(cellAddress);
        let cellObj = sheetDB[row][col];
        let cell = getCellElement(row, col);
        
        let fontColor = textColorPicker.value;
        cellObj.textColor = fontColor;
        cell.style.color = fontColor;
    }
})

cellColorPicker.addEventListener('input', (e) => {
    let cellAddress = addressBar.value;
    
    if(cellAddress) {
        let {row, col} = getCellRowAndCol(cellAddress);
        let cellObj = sheetDB[row][col];
        let cell = getCellElement(row, col);
        
        let cellColor = cellColorPicker.value;
        cellObj.cellColor = cellColor;
        cell.style.backgroundColor = cellColor;
    }
})