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


// dichiaro le variabili che memorizzano se è esplosa una bomba e a che score sono.
let kaboom = false
let win = false
let score = 0
let maxScore = 0
// creo le funzioni
//! funzione per generare i numeri random nel range dato
const randomNumberPc = (min,max) => Math.floor(Math.random() * (max - min + 1) + min)

//!  funzione per creare una cella
function getNewCell(num, bombe, gridSize){
    const cell = document.createElement('div');
    cell.className = 'cell' + gridSize
    cell.addEventListener('click',()=>onCellClick(cell,num,bombe))
    return cell   
}
// ! funzione per sapere se nell'array c'è il dato elemento
function listContains(list, element){
    for(let i= 0; i<list.length; i++){
        if(list[i] === element) return true
    }
    return false
}
// ! funzione per rimuovere tutti i figli di un elemento html
function removeAllChild(element){
    while (element.firstChild) {
        element.removeChild(element.lastChild)
    }
    return element
}
// ! funzione per resettare l'elemento
function resetElement(result){
    removeAllChild(result)
    result.className = ''
    return result
}
// ! funzione per creare elementi di tipo testo
function createTextElement(type, text) {
    const el = document.createElement(type)
    el.innerText = text
    return el
}

// ! funzione da eseguire quando l'utente perde (esplode una mina)
function onKaboom(){
    const result = resetElement(document.getElementById('result'));
    const shadow = result.parentElement;
    result.appendChild(createTextElement('h1','💣 Game Over 💣'))
    result.appendChild(createTextElement('p',`Punteggio: ${score}`))
    result.classList.add('red');
    const closePopup = ()=>shadow.classList.remove('show');
    shadow.addEventListener('click',closePopup);
    result.addEventListener('click',closePopup)
    shadow.classList.add('show');
}
// ! fumzione da eseguire quando l'utente vince
function onWin(){
    const result = resetElement(document.getElementById('result'));
    const shadow = result.parentElement;
    result.appendChild(createTextElement('h1','🎉 Hai Vinto 🎉'))
    result.appendChild(createTextElement('p',`Punteggio: ${score}`))
    result.classList.add('azure');
    const closePopup = ()=>shadow.classList.remove('show');
    shadow.addEventListener('click',closePopup);
    result.addEventListener('click',closePopup)
    shadow.classList.add('show');
}

//!  funzione da eseguire a click della cella
function onCellClick(cell, num, bombe){
    console.log('cella n:',num)
    console.log('kaboom:',kaboom)
    if(kaboom){
        onKaboom()
        return
    }
    if(win){
        onWin()
        return
    }
    if(cell.classList.contains('azure') || cell.classList.contains('red')) return 

    if(listContains(bombe,num)){
        cell.classList.add('red')
        kaboom = true
        onKaboom()
    }else{
        cell.classList.add('azure')
        score+=50
        if(maxScore===score){
            win = true
            onWin()
        }
    }
}

//*  mi metto in ascolto sul btn per la creazione della griglia
document.getElementById('start').addEventListener('click', function(){
    //*  prendo l'elemento griglia e rimuovo eventuali celle preesistenti
    const grid = removeAllChild(document.getElementById('grid'));
    const level = document.getElementById('level');
    // resetto kaboom e score
    kaboom = false
    score = 0
    win = false

    
    //*  devo creare una griglia di celle
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
    let i = 0
    while ( i < 16){
        const rnp =  randomNumberPc(1,total)
        if(!listContains(bombe, rnp)){
            bombe[i] =  rnp
            i++ 
        }
    
    }
    console.log('bombe:', bombe)
    //* stabilisco il punteggio massimo dell'utente
    maxScore = (total - bombe.length)*50

    //*  creo celle in base al livello
    for(let i = 1; i <= total; i++ ){
        //  aggancio la cella alla griglia
        grid.appendChild(getNewCell(i,bombe, level.value))
    }
})

