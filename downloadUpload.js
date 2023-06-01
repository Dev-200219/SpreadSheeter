let downloadBtn = document.querySelector('.download-btn');
let uploadBtn = document.querySelector('.upload-btn');

downloadBtn.addEventListener('click', (e) => {
    let JSONData = JSON.stringify([sheetDB, graph]);
    let fileBlob = new Blob([JSONData], {type : 'application/json'});

    let a = document.createElement('a');
    a.href = URL.createObjectURL(fileBlob);
    a.download = 'SheetData.json';
    a.click();
})

uploadBtn.addEventListener('click', (e) => {
    let input = document.createElement('input')
    input.setAttribute('type', 'file');
    input.click();
    
    input.addEventListener('change', (e) => {
        let filesToBeRead = input.files[0];
        //provided by browser to read the input files
        let fr = new FileReader();
        fr.readAsText(filesToBeRead);

        fr.addEventListener('load', (e) => {
            let result = JSON.parse(fr.result);

            sheetAddBtn.click();
            sheetDB = result[0];
            graph = result[1];
            allSheetsDB[allSheetsDB.length - 1] = sheetDB;
            allSheetsGraph[allSheetsGraph.length - 1] = graph;
            let allSheetFolders = document.querySelectorAll('.sheet-folder');
            let currSheet = allSheetFolders[allSheetFolders.length - 1];

            currSheet.click();
        })
    })
})