let rows = 100;
let cols = 26;

let rowAddressCont = document.querySelector('.row-address-cont');
let colAddressCont = document.querySelector('.col-address-cont');
let cellsContainer = document.querySelector('.cells-cont');
let addressBar = document.querySelector('.address-bar')

for(let i = 1; i <= rows; i++) {
    let rowAdd = document.createElement('div');
    rowAdd.classList.add('row-address');
    rowAdd.innerText = i;
    rowAddressCont.appendChild(rowAdd);
}

for(let i = 0; i < cols; i++) {
    let colAdd = document.createElement('div');
    colAdd.classList.add('col-address');
    colAdd.innerText = String.fromCharCode(i + 65);
    colAddressCont.appendChild(colAdd);
}

for(let i = 1; i <= rows; i++) {
    let rowContainer = document.createElement('div');
    rowContainer.classList.add('row-container')
    cellsContainer.appendChild(rowContainer);

    for(let j = 1; j <= cols; j++) {
        let cell = document.createElement('div');
        cell.setAttribute('contenteditable', 'true');
        cell.classList.add('cell');

        cell.addEventListener('click', (e) => {
            let address = `${String.fromCharCode(j + 64)}${i}`;
            addressBar.value = address;
        })

        rowContainer.append(cell);
    }
}