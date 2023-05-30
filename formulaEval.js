for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
        let cell = document.querySelector("[rid = '" + i + "'][cid = '" + j + "']");

        cell.addEventListener('blur', (e) => {
            let address = addressBar.value;
            let {row, col} = getCellRowAndCol(address);
            let cell = getCellElement(row, col);

            if(cell.innerText == sheetDB[row][col].value) return;

            removeOldChildParentDependencies(address);
            updateUIAndStorage(address, cell.innerText, "");
            updateChildrenCellValues(address);
        })
    }
}

formulaBar.addEventListener('keypress', (e) => {
    let formula = formulaBar.value;
    let address = addressBar.value;
    if(e.key === 'Enter' && formula && address) {
        removeOldChildParentDependencies(address);
        addNewChildParentDependencies(formula, address)
        let evaluatedValue = evaluateFormula(formula);
        updateUIAndStorage(address, evaluatedValue, formula);
        updateChildrenCellValues(address);
    }
})

function removeOldChildParentDependencies(address) {
    let {row, col} = getCellRowAndCol(address);
    let cellObj = sheetDB[row][col];
    let formula = cellObj.formula;
    let encodedFormula = formula.split(' ');
    
    for(let i = 0; i < encodedFormula.length; i++) {
        let firstCharCode = encodedFormula[i].charCodeAt(0);

        if(firstCharCode >= 65 && firstCharCode <= 90) {
            let {row, col} = getCellRowAndCol(encodedFormula[i]);
            let parentCellProp = sheetDB[row][col];
            let childAddIdx = parentCellProp.children.indexOf(address);
            parentCellProp.children.splice(childAddIdx, 1);
        }
    }
}

function addNewChildParentDependencies(formula, childCellAddress) {
    let {row, col} = getCellRowAndCol(childCellAddress);
    let encodedFormula = formula.split(' ');
    let childCellProp = sheetDB[row][col];
    childCellProp.parent = [];

    for(let i = 0; i < encodedFormula.length; i++) {
        let firstCharCode = encodedFormula[i].charCodeAt(0);

        if(firstCharCode >= 65 && firstCharCode <= 90) {
            let {row, col} = getCellRowAndCol(encodedFormula[i]);
            let parentCellProp = sheetDB[row][col];
            
            if(!parentCellProp.children.includes(childCellAddress))
            parentCellProp.children.push(childCellAddress);
            
            childCellProp.parent.push(encodedFormula[i]);
        }
    }
}

function evaluateFormula(formula) {
    let encodedFormula = formula.split(' ');

    for(let i = 0; i < encodedFormula.length; i++) {
        let firstCharCode = encodedFormula[i].charCodeAt(0);

        if(firstCharCode >= 65 && firstCharCode <= 90) {
            let {row, col} = getCellRowAndCol(encodedFormula[i]);
            encodedFormula[i] = sheetDB[row][col].value;
        }
    }

    let decodedString = encodedFormula.join(' ');
    return eval(decodedString);
}

function updateChildrenCellValues(address) {
    let {row, col} = getCellRowAndCol(address);
    let cellObj = sheetDB[row][col];

    let children = cellObj.children;

    for(let i = 0; i < children.length; i++) {
        let childrenCellAdd = children[i];
        let {row, col} = getCellRowAndCol(childrenCellAdd);
        let childrenCellProp = sheetDB[row][col];
        let evaluatedValue = evaluateFormula(childrenCellProp.formula);
        updateUIAndStorage(childrenCellAdd, evaluatedValue, childrenCellProp.formula);
        updateChildrenCellValues(childrenCellAdd);
    }
}

function updateUIAndStorage(address, evalValue, formula) {
    let {row, col} = getCellRowAndCol(address);
    let cellElement = getCellElement(row, col);
    let cellProp = sheetDB[row][col];
    cellElement.innerText = evalValue;
    cellProp.value = evalValue;
    cellProp.formula = formula;
}

