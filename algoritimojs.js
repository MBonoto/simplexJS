class Simplex {
    constructor() {
        this.table = [];
    }

    setObjectiveFunction(fo) {
        this.table.push(fo);
    }

    addRestrictions(sa) {
        this.table.push(sa);
    }

    getEntryColumn() {
        const columnPivot = Math.min(...this.table[0]);
        const index = this.table[0].indexOf(columnPivot);
        return index;
    }

    getExitLine(entryColumn) {
        const results = {};
        for (let line = 0; line < this.table.length; line++) {
            if (line > 0) {
                if (this.table[line][entryColumn] > 0) {
                    const division = this.table[line][this.table[line].length - 1] / this.table[line][entryColumn];
                    results[line] = division;
                }
            }
        }
        const index = Object.keys(results).reduce((a, b) => results[a] < results[b] ? a : b);
        return parseInt(index);
    }

    calculateNewLinePivot(entryColumn, exitLine) {
        const line = this.table[exitLine];
        const pivot = line[entryColumn];
        const newPivotLine = line.map(value => value / pivot);
        return newPivotLine;
    }

    calculateNewLine(line, entryColumn, pivotLine) {
        const pivot = line[entryColumn] * -1;
        const resultLine = pivotLine.map(value => value * pivot);
        const newLine = resultLine.map((value, i) => value + line[i]);
        return newLine;
    }

    isNegative() {
        const negative = this.table[0].filter(x => x < 0);
        return negative.length > 0;
    }

    showTable() {
        var table2 = [];
        var table3 = [];
        for (let i = 0; i < this.table.length; i++) {
            for (let j = 0; j < this.table[0].length; j++) {
                table2.push(this.table[i][j]);
            }
            table3.push(table2);
            table2= [];
        }
        console.log(table3);
        return table3;
    }

    calculate() {
        const entryColumn = this.getEntryColumn();
        const firstExitLine = this.getExitLine(entryColumn);
        const pivotLine = this.calculateNewLinePivot(entryColumn, firstExitLine);
        this.table[firstExitLine] = pivotLine;

        const tableCopy = [...this.table];

        for (let index = 0; index < this.table.length; index++) {
            if (index !== firstExitLine) {
                const line = tableCopy[index];
                const newLine = this.calculateNewLine(line, entryColumn, pivotLine);
                this.table[index] = newLine;
            }
        }
    }

    solve() {
        this.calculate();

        while (this.isNegative()) {
            this.calculate();
        }

        this.showTable();
    }
}

const simplex2 = new Simplex();

simplex2.setObjectiveFunction([1,-5,-2,0,0,0]);
simplex2.addRestrictions([0,2,1,1,0,6]);
simplex2.addRestrictions([0,10,12,0,1,60]);

