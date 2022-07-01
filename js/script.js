// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati (delle bombe) - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// # MILESTONE 1
// Prepariamo "qualcosa" per tenere il punteggio dell'utente.
// Quando l'utente clicca su una cella, incrementiamo il punteggio.
// Se riusciamo, facciamo anche in modo da non poter più cliccare la stessa cella.
// # MILESTONE 2
// Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
// Generiamoli e stampiamo in console per essere certi che siano corretti
// # MILESTONE 3
// Quando l'utente clicca su una cella, verifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe. Se si, la cella diventa rossa (raccogliamo il punteggio e e scriviamo in console che la partita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.
// # MILESTONE 4
// Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto il punteggio massimo perchè in quel caso la partita termina. Raccogliamo quindi il messaggio è scriviamo un messaggio appropriato.
// (Ma come stabiliamo quale sia il punteggio massimo?)
// # MILESTONE 5
// Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o se perchè l'utente ha raggiunto il punteggio massimo. Dobbiamo poi stampare in pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.

//! funzione per generare i numeri random nel range dato
const randomNumberPc = (min,max) => Math.floor(Math.random() * (max - min + 1) + min)

//* 1.3. funzione per creare una cella
function getNewCell(num, bombe, gridSize, score){
    const cell = document.createElement('div');
    cell.className = 'cell' + gridSize
    cell.addEventListener('click',()=>onCellClick(cell,num,bombe,score))
    return cell   
}

function listContains(list, element){
    for(let i= 0; i<list.lenght;i++){
        if(list[i] === element) return true
    }
    return false
}

// 2. funzione per colorare la cella al click
function onCellClick(cell, num, bombe, score){
    console.log('cella n:',num)
    if(cell.classList.contains('azure') || cell.classList.contains('red')) return 

    if(listContains(bombe,num)){
        cell.classList.add('red')
    }else{
        cell.classList.add('azure')
        score+=50
    }
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
    // ! creo array per le bombe
    const bombe = []
    for (let i = 0; i < 16; i++){
        bombe[i] =  randomNumberPc(1,total)
    }

    //! creo la variabile che tiene il punteggio e la passo alla cella che sto creando
    let score = 0
    //* 1.4. creo celle in base al livello
    for(let i = 1; i <= total; i++ ){
        // 1.4.1 aggancio la cella alla griglia
        grid.appendChild(getNewCell(i,bombe, level.value, score))
    }
})

