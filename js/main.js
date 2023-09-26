"use strict";
var nota1_e = document.getElementById("nota1");
var nota2_e = document.getElementById("nota2");
nota1_e.addEventListener("input", calc);
nota2_e.addEventListener("input", calc);
const COLORS = {
    Error: "#f20808",
    Reproved: "#a20202",
    Approved: "#08f208",
    Needing: "#08f2f2"
};
function calc() {
    var nota1 = nota1_e.value;
    var nota2 = nota2_e.value;
    if (nota1 == "10")
        nota1 = "100";
    if (nota2 == "10")
        nota2 = "100";
    if (nota1 == "" || nota1.match(/[a-z]/i) != null || nota1.length == 2 || nota1.length > 3) {
        return escrever("A primeira nota é inválida. Verifique se digitou corretamente!", COLORS.Error);
    }
    if (nota2 == "" || nota2.match(/[a-z]/i) != null || nota2.length == 2 || nota2.length > 3) {
        return escrever("A segunda nota é invalida. Verifique se digitou corretamente!", COLORS.Error);
    }
    var n1 = parseInt(nota1.split(",").join("").split(".").join(""));
    var n2 = parseInt(nota2.split(",").join("").split(".").join(""));
    if (n1 > 100)
        return escrever("Parece que a primeira nota é maior do que deveria.", COLORS.Error);
    if (n2 > 100)
        return escrever("Parece que a segunda nota é maior do que deveria.", COLORS.Error);
    n1 *= nota1.length == 1 ? 10 : 1;
    n2 *= nota2.length == 1 ? 10 : 1;
    var soma = n1 + n2;
    var falta = (600 - 3 * soma) / 4;
    if (falta < 0)
        return escrever("Parece que alguma nota é maior do que deveria.", COLORS.Error);
    if (falta > 100)
        return escrever("Infelizmente você já foi reprovado nessa disciplina.", COLORS.Reproved);
    var fst = ((falta + 0.5) / 10).toFixed(1);
    if (falta == 0)
        return escrever("Você já foi aprovado nessa disciplina!", COLORS.Approved);
    escrever(`Lhe faltam ${fst} pontos para ser aprovado nessa disciplina!`, COLORS.Needing);
}
function escrever(msg, color) {
    document.getElementsByClassName("wrapper-output")[0].style.backgroundColor = color;
    document.getElementById("res").innerText = msg;
}
