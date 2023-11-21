var numVariaveis = 0;
var numConstraints = 0;
var numInputsConstraints = 0;
const btn = document.querySelector("#confirm");
const btnConst = document.querySelector("#addConstraint");
const btnsolve = document.querySelector("#solve");

var linha = 0;

var table = [];
const numeros = {
    objetivo: [],
    restricoes: []
}



btn.addEventListener("click", function(e){

    e.preventDefault();

    const name = document.querySelector("#variaveis");

    numVariaveis = name.value;

    console.log(numVariaveis);

    montarFO(numVariaveis);

    let passo1 = document.querySelectorAll(".passo1");
         for (let index = 0; index < passo1.length; index++) {
            passo1[index].classList.add("apagar");
       }

});

btnConst.addEventListener("click", function(e){
    var container = document.querySelector(".constraints");
    var div = document.createElement("div");
    container.appendChild(div);
    div.classList.add("list");



    for(var i = 0;i < numVariaveis; i++){
        var input = document.createElement("input");
        var paragrafo = document.createElement("p");
        
        paragrafo.textContent = "X" + (i+1) + " + ";
        div.append(input);
        input.classList.add("const");
        div.append(paragrafo);

        numInputsConstraints += 1;
    }
    mudarConst("const");
    numConstraints += 1;
    numInputsConstraints += 1;
    div.setAttribute("id", "constList" + numConstraints);

        var pconst = document.querySelectorAll("#constList"+ numConstraints + " p");
        pconst[(numVariaveis - 1)].textContent = "X" + numVariaveis + " <=";
        
        inputResult = document.createElement("input");
        div.append(inputResult);
        inputResult.setAttribute("id", "constResult" + numConstraints);
        inputResult.classList.add("input");



});

function montarFO(numVariaveis) {
    var container = document.querySelector(".variaveisContainer");

    for(var i = 0;i < numVariaveis;i++){
        var input = document.createElement("input");
        var paragrafo = document.createElement("p");
        
        paragrafo.textContent = "X" + (i+1) + " + ";
        container.append(input);
        container.append(paragrafo);
    }
    mudarVar("var");
    

};

function montarConstraints(numVariaveis) {
    var container = document.querySelector(".contraints");
    var div = document.createElement("div");
    div.classList.add("list");
    container.append(div);


    for(var i = 0;i < numVariaveis;i++){
        var input = document.createElement("input");
        var paragrafo = document.createElement("p");
        
        paragrafo.textContent = "X" + (i+1) + " + ";
        div.append(input);
        div.append(paragrafo);
    }
    

};

function mudarVar(variavel) {
    var str = ''
    let inputs = document.querySelectorAll("input");
         for (let index = 0; index < inputs.length; index++) {
            str = variavel + index;
            inputs[index].classList.add("input");
            inputs[index].setAttribute("type", "number");
            inputs[index].setAttribute("id", str);
       }
 }

 function mudarConst(constr) {
    var str = ''
    let inputs = document.querySelectorAll(".constraints .const");
         for (let index = 0; index < inputs.length; index++) {
            str = constr + (index + 1);
            inputs[index].classList.add("input");
            inputs[index].setAttribute("type", "number");
            inputs[index].setAttribute("id", str);
       }
 }

btnsolve.addEventListener("click", function(e){

    e.preventDefault();

    table.push(montarTabelaFO());
    for (var i=0;i<numConstraints;i++){
        table.push(montarTabelaConstraints(i))
    }
    console.log(table);
    linha = 0;

    criarTabela(table);

    const simplex = new Simplex();
    simplex.setObjectiveFunction(montarTabelaFO());
    console.log(simplex);
    

    
    for (var i=0;i<numConstraints;i++){
        simplex.addRestrictions(montarTabelaConstraints(i));
    }
    console.log(simplex);

    simplex.solve();
});


function montarTabelaFO() {
    var fo = [1]
    //coloca variaveis
    for(var i = 0;i < numVariaveis;i++){
        const variavel = document.querySelector("#var" + (i+1));
        fo.push(Number(variavel.value));
    }

    //coloca as constraints xf1 xf2
    for(var i = 0;i < numConstraints;i++){
        fo.push(0);
    }

    fo.push(0);

    return fo;
}


function montarTabelaConstraints(j) {
        var sa = []

        sa.push(0);
        for(var i = 1; i <= numVariaveis; i++){
            const constraint = document.querySelector("#const" + (i + (linha * numVariaveis)));
            sa.push(Number(constraint.value));
        }

        //coloca as constraints xf1 xf2
        for(var i = 0;i < numConstraints;i++){
            if (i == j){
                sa.push(1);
            } else {
                sa.push(0);
            }
        }

        const constraintResult = document.querySelector("#constResult" + (j+1));
        sa.push(Number(constraintResult.value));

        linha++;

        return sa;
}


  function criarTabela(dados) {
    // Cria um elemento de tabela
    var table = document.createElement('table');

    // Adiciona uma linha de cabeçalho
    var headerRow = table.insertRow(0);
    var headerCell = headerRow.insertCell(-1);
        headerCell.textContent = "Z";

    for (var i = 0;i < numVariaveis;i++) {
        var headerCell = headerRow.insertCell(-1);
        headerCell.textContent = "X" + (i+1);
    }
    for (var i = 0;i < numConstraints;i++) {
        var headerCell = headerRow.insertCell(-1);
        headerCell.textContent = "Xf" + (i+1);
    }

    var headerCell = headerRow.insertCell(-1);
        headerCell.textContent = "B";

    // Adiciona as linhas de dados
    for (var i = 0; i < dados.length; i++) {
        var dataRow = table.insertRow(-1);
        for (var key in dados[i]) {
            var dataCell = dataRow.insertCell(-1);
            dataCell.textContent = dados[i][key];
        }
    }

    // Adiciona a tabela ao corpo do documento
    document.body.appendChild(table);
}