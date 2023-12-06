var nota1_e = <HTMLInputElement>document.getElementById("nota1");
var nota2_e = <HTMLInputElement>document.getElementById("nota2");
var nota3_e = <HTMLInputElement>document.getElementById("nota3");

nota1_e.addEventListener("input", calc);
nota2_e.addEventListener("input", calc);
nota3_e.addEventListener("input", calc);

const COLORS = {
    Error:    "#f20808",
    Reproved: "#a20202",
    Approved: "#08f208",
    Needing:  "#08f2f2"
}

function calc(): void {
    var nota1 = nota1_e.value;
    var nota2 = nota2_e.value;
    var nota3 = nota3_e.value;

    if (nota1 == "10") nota1 = "100";
    if (nota2 == "10") nota2 = "100";
    if (nota3 == "10") nota3 = "100";

    if (nota1 == "" || nota1.match(/[a-z]/i) != null || nota1.length == 2 || nota1.length > 3 ) {
        return escrever("A primeira nota é inválida. Verifique se digitou corretamente!", COLORS.Error);
    }
    if (nota2 == "" || nota2.match(/[a-z]/i) != null || nota2.length == 2 || nota2.length > 3 ) {
        return escrever("A segunda nota é invalida. Verifique se digitou corretamente!", COLORS.Error);
    }
    if (nota3 == "" || nota3.match(/[a-z]/i) != null || nota3.length == 2 || nota3.length > 3 ) {
        return escrever("A terceira nota é invalida. Verifique se digitou corretamente!", COLORS.Error);
    }

    var n1 = parseInt(nota1.split(",").join("").split(".").join(""));
    var n2 = parseInt(nota2.split(",").join("").split(".").join(""));
    var n3 = parseInt(nota3.split(",").join("").split(".").join(""));

    if (n1 > 100) return escrever("Parece que a primeira nota é maior do que deveria.", COLORS.Error);
    if (n2 > 100) return escrever("Parece que a segunda nota é maior do que deveria.", COLORS.Error);
    if (n3 > 100) return escrever("Parece que a terceira nota é maior do que deveria.", COLORS.Error);

    n1 *= nota1.length == 1 ? 10 : 1;
    n2 *= nota2.length == 1 ? 10 : 1;
    n3 *= nota3.length == 1 ? 10 : 1;

    var soma = 3*(n1 + n2) + 4*n3;
    var final = getDecimal(soma, 2);
    
    if (soma >= 600) return escrever(`Parabéns! Você foi aprovado nessa diciplina! Sua nota final foi ${final}.`, COLORS.Approved);
    else {
        var falta = parseInt(((600 - 3*(n1 + n2)) / 4 + 0.5).toString());
        var falta_str = getDecimal(falta, 1);

        if (falta > 100) return escrever(`Infelizmente, você foi reprovado nessa disciplina. Você precisava de ${falta_str} nesse último trimestre.`, COLORS.Reproved);
        return escrever(`Infelizmente, você foi reprovado nessa disciplina. Você ainda pode ser aprovado se conseguir nota ${falta_str} no EAC dessa disciplina!`, COLORS.Needing)
    }
}

function escrever(msg: string, color: string): void {
    (<HTMLDivElement>document.getElementsByClassName("wrapper-output")[0]).style.backgroundColor = color;
    (<HTMLSpanElement>document.getElementById("res")).innerText = msg;
}

function getDecimal(nota: number, casas: number): string {
    var spl = nota.toString().split("");
    spl.splice(spl.length-casas, 0, ",");
    return spl.join("");
}
