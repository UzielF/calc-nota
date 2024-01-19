class ToolC {
    public constructor () {}

    public update(): void {
        var grades: number[] = [];
        for (let id of InputHandlerC.INPUTS) {
            let elem = <HTMLInputElement>document.getElementById(id);
            let value = elem.value;

            if (value.length == 1 || value == "10" || /\.|,/.test(value.at(-1))
        }
    }
}
