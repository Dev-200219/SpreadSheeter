let rows = 100;
let cols = 26;

/* 
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
*/

let rowAddressCont = document.querySelector('.row-address-cont');
let colAddressCont = document.querySelector('.col-address-cont');
let cellsContainer = document.querySelector('.cells-cont');
let addressBar = document.querySelector('.address-bar');
let boldBtn = document.querySelector('.bold');
let italicBtn = document.querySelector('.italic');
let underlineBtn = document.querySelector('.underline');
let alignment = document.querySelectorAll('.alignment');
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];
let fontFamilyInput = document.querySelector('.font-family-prop');
let fontSizeInput = document.querySelector('.font-size-prop');
let textColorPicker = document.querySelector('.text-color-picker');
let cellColorPicker = document.querySelector('.cell-color-picker');
let formulaBar = document.querySelector('.formula-bar');
let activeColorProp = "#d1d8e0";
let inactiveColorProp = "#ecf0f1";

//generate row tags(1-100)
for(let i = 1; i <= rows; i++) {
    let rowAdd = document.createElement('div');
    rowAdd.classList.add('row-address');
    rowAdd.textContent = i;
    rowAddressCont.appendChild(rowAdd);
}

//generate column tags(A-Z)
for(let i = 0; i < cols; i++) {
    let colAdd = document.createElement('div');
    colAdd.classList.add('col-address');
    colAdd.textContent = String.fromCharCode(i + 65);
    colAddressCont.appendChild(colAdd);
}


//generate actual cells for each row
for(let i = 0; i < rows; i++) {
    let rowContainer = document.createElement('div');
    rowContainer.classList.add('row-container')
    cellsContainer.appendChild(rowContainer);

    for(let j = 0; j < cols; j++) {
        let cell = document.createElement('div');
        cell.setAttribute('contenteditable', 'true');
        cell.setAttribute('spellcheck', 'false');
        cell.classList.add('cell');
        cell.setAttribute('rid', i);
        cell.setAttribute('cid', j);
        rowContainer.append(cell);
    }
}