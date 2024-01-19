"use strict";
class ToolC {
    Grades = [];
    First_Quarter = 0;
    Second_Quarter = 0;
    Third_Quarter = 0;
    Final_Grade = 0;
    Grade_Needed = 0;
    constructor() { }
    update() {
        this.Grades = [];
        for (let id of InputHandlerC.INPUTS) {
            let elem = document.getElementById(id);
            let value = elem.value;
            if (value.length <= 1 || value == "10" || /\.|,/.test(value.at(-1)))
                value += "0";
            this.Grades.push(parseInt(value.replace(/\.|,/, "")));
        }
        this.First_Quarter = Math.max(this.Grades[0], this.Grades[1]);
        this.Second_Quarter = Math.max(this.Grades[2], this.Grades[3]);
        this.Third_Quarter = Math.max(this.Grades[4], this.Grades[5]);
        var fs_quarter = this.First_Quarter + this.Second_Quarter;
        this.Final_Grade = 3 * fs_quarter + 4 * (this.Third_Quarter);
        this.Grade_Needed = Math.floor((600 - 3 * fs_quarter) / 4 + 0.75);
        this._updateInputs();
        this._updateMathJax();
        this._updateStudentDivs();
    }
    _updateMathJax() {
        var container = document.getElementsByClassName("math-representation")[0];
        var a_str = this._decimalRepresentation(this.First_Quarter, 1);
        var b_str = this._decimalRepresentation(this.Second_Quarter, 1);
        var c_str = this._decimalRepresentation(this.Third_Quarter, 1);
        var d_str = this._decimalRepresentation(this.Final_Grade, 2);
        container.innerHTML = `$$\\dfrac{3\\times${a_str} + 3\\times${b_str} + 4\\times${c_str}}{10} = ${d_str}$$`;
        MathJax.typeset();
        var mjx_numbers = document.getElementsByTagName("mjx-mn");
        mjx_numbers.item(1).style.color = "red";
        mjx_numbers.item(3).style.color = "blue";
        mjx_numbers.item(5).style.color = "green";
    }
    _updateStudentDivs() {
        var student_state = (this.Final_Grade >= 600) ? true : false;
        var student_opportunity = (this.Grade_Needed <= 100) ? true : false;
        var container_state = document.getElementsByClassName("student-state")[0];
        var container_opportunity = document.getElementsByClassName("student-opportunity")[0];
        container_state.classList.remove("approved", "failed");
        container_opportunity.classList.remove("approved", "opportunity", "failed");
        if (student_state == true) {
            container_state.innerText = `Você foi aprovado nessa disciplina, com o aproveitamento de ${this._decimalRepresentation(this.Final_Grade, 2)} ponto(s).`;
            container_state.classList.add("approved");
            container_opportunity.innerText = `Você não precisa de um aproveitamento específico no próximo trimestre/E.A.C., porém não deixe de tentar um aproveitamento melhor!`;
            container_opportunity.classList.add("approved");
        }
        else {
            container_state.innerText = `Você ainda não foi aprovado nessa disciplina pois seu aproveitamento foi de ${this._decimalRepresentation(this.Final_Grade, 2)} ponto(s).`;
            container_state.classList.add("failed");
            if (student_opportunity == true) {
                container_opportunity.innerText = `Você ainda pode ser aprovado se no último trimestre/E.A.C. obter o aproveitamento de ${this._decimalRepresentation(this.Grade_Needed, 1)} ponto(s).`;
                container_opportunity.classList.add("opportunity");
            }
            else {
                container_opportunity.innerText = `Você não pode ser aprovado, pois precisaria obter o aproveitamento de ${this._decimalRepresentation(this.Grade_Needed, 1)} ponto(s) no último trimestre/E.A.C.`;
                container_opportunity.classList.add("failed");
            }
        }
    }
    _updateInputs() {
        var labels = document.getElementsByTagName("label");
        for (let i = 0; i < labels.length; i++) {
            labels.item(i).style.color = "";
        }
        if (this.Grades[0] >= this.Grades[1])
            labels.item(0).style.color = "red";
        if (this.Grades[0] <= this.Grades[1])
            labels.item(1).style.color = "red";
        if (this.Grades[2] >= this.Grades[3])
            labels.item(2).style.color = "blue";
        if (this.Grades[2] <= this.Grades[3])
            labels.item(3).style.color = "blue";
        if (this.Grades[4] >= this.Grades[5])
            labels.item(4).style.color = "green";
        if (this.Grades[4] <= this.Grades[5])
            labels.item(5).style.color = "green";
    }
    _decimalRepresentation(value, decimal_places) {
        var num = value.toString();
        if (decimal_places >= num.length)
            num = num.padStart(decimal_places + 1, "0");
        var representation = num.split("");
        representation.splice(num.length - decimal_places, 0, ".");
        return representation.join("");
    }
}
