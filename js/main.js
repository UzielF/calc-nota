"use strict";
document.getElementById("calc").addEventListener("click", calc);
function calc() {
    var nota1 = parse(document.getElementById("nota1").value, "Nota 1");
    var nota2 = parse(document.getElementById("nota2").value, "Nota 2");
    var trim_1e2 = nota1 + nota2;
    var falta = (600 - 3 * trim_1e2) / 4;
    console.log(falta);
    if (falta <= 0) {
        escrever(`Você já passou nessa disciplina!`);
        return;
    }
    if (falta > 100) {
        escrever(`Infelizmente você já rodou nessa matéria, pois precisa de ${(Math.floor(falta + 0.5) / 10).toFixed(1)} pontos.`);
        return;
    }
    escrever(`Te faltam ${(Math.floor(falta + 0.5) / 10).toFixed(1)} pontos.`);
}
function parse(str, nota) {
    if (str.length == 1 || str == "10")
        return 10 * parseInt(str);
    if (str.length !== 3) {
        escrever(`${nota} invalida.`);
        throw "Erro" + nota;
    }
    var n = str.split(",").join("").split(".").join("");
    return parseInt(n);
}
function escrever(msg) {
    document.getElementById("res").innerText = msg;
}
