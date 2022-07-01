//* 1.3. funzione per creare una celle
function getNewCell(num, gridSize){
    const cell = document.createElement('div');
    cell.className = 'cell' + gridSize
    cell.innerText = num
    cell.addEventListener('click',colorizeCell)
    return cell   
}

// 2. funzione per colorare la cella al click
function colorizeCell(e){
    const cell = e.target
    if(cell.classList.contains('azure')) return 
    cell.classList.add('azure')
    console.log('cella:',cell.innerText)
}


//* 1. mi metto in ascolto sul btn per la creazione della griglia
document.getElementById('start').addEventListener('click', function(){
    //* 1.1. prendo l'elemento griglia
    const grid = document.getElementById('grid');
    const level = document.getElementById('level');
    //* rimuovo eventuali celle preesistenti
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild)
    }
    //* 1.2. devo creare una griglia di celle
    let total = 0
    switch(level.value){
        case '10x10': 
            total = 10*10
            break
        case '9x9':
            total= 9*9
            break
        case '7x7':
            total = 7*7
            break
    }
    //* 1.4. creo celle in base al livello
    for(let i = 1; i <= total; i++ ){
        // 1.4.1 aggancio la cella alla griglia
        grid.appendChild(getNewCell(i, level.value))
    }
})

