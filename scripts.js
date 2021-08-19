/*
    Projeto do site https://www.mundojs.com.br/2020/06/05/criando-jogo-snake-em-javascript-e-canvas/
    Alterações por Luiz Gonzaga Franco Michelmann
    Data 19/08/2021
*/

let canvas;
let ctx;
let x = 8 // velocidade
let tam = 3 // se trapaca for true esse vai ser o tamanho de adição ao comer o alimento
let trapaca = false;
sortCor();
let corComida = setCor;
let corFundo = "black";
sortCor();
let corCobra = setCor;
let tamanhoPadrao = 1;
let isPlay = true;

window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    document.addEventListener("keydown", keyDownEvent);

    //Renderiza 8 vezes por segundo

    const stop = setInterval(desenharJogo, 1000 / x);
    
};

//Criação da tela de jogo
let tamanhoTela = tamanhoCaminho = 20;
let nextX = nextY = 0;

//Criação da cobra
let defaultTamanhoCauda = tamanhoPadrao;
let tamanhoCauda = defaultTamanhoCauda;
let caminhoCobra = [];

let cobraEixoX = Math.floor(Math.random() * tamanhoTela);
let cobraEixoY = Math.floor(Math.random() * tamanhoTela);
sortCor();
//let cobraEixoX = cobraEixoY = 5;

//Criação da comida
let appleX = (appleY = 15);

function desenharJogo() {
    cobraEixoX += nextX;
    cobraEixoY += nextY;

    if (cobraEixoX < 0) {
        cobraEixoX = tamanhoTela - 1;
    }

    if (cobraEixoX > tamanhoTela - 1) {
        cobraEixoX = 0;
    }

    if (cobraEixoY < 0) {
        cobraEixoY = tamanhoTela - 1;
    }

    if (cobraEixoY > tamanhoTela - 1) {
        cobraEixoY = 0;
    }

    //Se a cobra comer o alimento
    if (cobraEixoX == appleX && cobraEixoY == appleY) {
        if (trapaca === true) {
            tamanhoCauda = tamanhoCauda + tam;
        }
        else {
            tamanhoCauda++;
            sortCor();
            corComida = setCor;
        }
        x = x + 1;
        console.log('aumenta x=' + x);
        appleX = Math.floor(Math.random() * tamanhoTela);
        appleY = Math.floor(Math.random() * tamanhoTela);
        sortCor();
    }
    ctx.fillStyle = corFundo;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = corCobra;
    for (let i = 0; i < caminhoCobra.length; i++) {
        ctx.fillRect(
            caminhoCobra[i].x * tamanhoCaminho,
            caminhoCobra[i].y * tamanhoCaminho,
            tamanhoCaminho,
            tamanhoCaminho
        );
        if (caminhoCobra[i].x == cobraEixoX && caminhoCobra[i].y == cobraEixoY) {
            if (trapaca === true) {
                // tamanhoCauda = defaultTamanhoCauda;
                // nao perde
            }
            else {
                tamanhoCauda = defaultTamanhoCauda;
            }
        }
    }

    ctx.fillStyle = corComida;
    ctx.fillRect(appleX * tamanhoCaminho, appleY * tamanhoCaminho, tamanhoCaminho, tamanhoCaminho);

    caminhoCobra.push({
        x: cobraEixoX,
        y: cobraEixoY
    });
    while (caminhoCobra.length > tamanhoCauda) {
        caminhoCobra.shift();
    }

    if(isPlay === false){
        console.log('perdeu');
    }

    if(tamanhoCauda == 5){
        clearInterval(stop);
        //alert('acabou');
    }
}

function keyDownEvent(event) {
    // nextX e nextY representam as direções que a cobra irá percorrer
    // nos eixos X e Y, respectivamente
    switch (event.keyCode) {
        case 37:
            nextX = -1;
            nextY = 0;
            break;
        case 38:
            nextX = 0;
            nextY = -1;
            break;
        case 39:
            nextX = 1;
            nextY = 0;
            break;
        case 40:
            nextX = 0;
            nextY = 1;
            break;
    }
}

function sortCor(){
    let cor = parseInt(Math.floor(Math.random() * 5));   
    switch(cor){
        case 0:
            setCor = "blue";
        break;
        case 1:
            setCor = "yellow";
        break;
        case 2:
            setCor = "red";
        break;
        case 3:
            setCor = "green";
        break;
        case 4:
            setCor = "orange";
        break;
    }
}