const gridContainer = document.querySelector('.grid-container');
const inputDisplay = document.getElementById('display');
const armazenaTxtInputDisplay = 

document.addEventListener("DOMContentLoaded", () => {
    gridContainer.addEventListener('click', (event) => {
        const click = event.target;

        if (click.tagName !== 'BUTTON') {
            return;
        }

        const type = click.dataset.type;
        const value = click.dataset.value;
        
        if(type === 'limpar') {
            limparInput();
        }

        if(type === 'deletar') {
            deletarUltimoChar();
        }

        if (type === 'numero') {
            inputDisplay.value += value;
            isOperador = false;
        }

        if (type === 'decimal') {
            adicionaDecimal();
        }
        
        if(type === 'operador' && isOperador === false) {
            inputDisplay.value += value;
        }

        if(type === 'operador') {
            isOperador = true;
        }

        if(type === 'igual') {
            realizaCalculoTotal();
        }
    });
});

function limparInput() {
    inputDisplay.value = '';
}

function deletarUltimoChar() {
    const armazenaValorInputDisplay =  inputDisplay.value;
    let armazenaTxt = "";

    for(let i = 0; i < armazenaValorInputDisplay.length - 1; i++) {
        armazenaTxt += armazenaValorInputDisplay[i];
    }
    inputDisplay.value = armazenaTxt;
}

function adicionaDecimal() {
    const armazenaTxtInputDisplay = inputDisplay.value;
    
    let ultimoNumero = armazenaTxtInputDisplay.split(/\+|-|\*|\//).pop();
    
    if (ultimoNumero.includes('.')) {
        return;
    }
    
    if (ultimoNumero === '') {
        return;
    }
    
    inputDisplay.value += '.';
}

function realizaCalculoTotal() {
    const armazenaInput = inputDisplay.value;
    const operadores = ['*', '/', '+', '-'];
    
    let arrayResult = [];
    let aux = '';

    for(let i = 0; i < armazenaInput.length; i++) {
        if(!operadores.includes(armazenaInput[i])) {
            aux += armazenaInput[i];
        } else {
            if(!isNaN(aux) || aux.trim() !== '') {
                arrayResult.push(aux);
                aux = '';
                arrayResult.push(armazenaInput[i]);
            }
        }
    }   

    if(aux.trim() !== '') {
        arrayResult.push(aux);
    }

    while(arrayResult.includes('*')) {        
        for(let i = 0; i < arrayResult.length; i++) {
            if(arrayResult[i] === '*') {
                const antecessor = arrayResult[i - 1];
                const sucessor = arrayResult[i + 1];
                let resultadoOperacao;

                if (antecessor === null || antecessor === '' || sucessor === null || sucessor === '') {
                    return;
                }
                
                resultadoOperacao = parseFloat(antecessor) * parseFloat(sucessor);

                arrayResult.splice(i - 1, 3, resultadoOperacao);
            }
        }
    }

    while(arrayResult.includes('/')) {
        for(let i = 0; i < arrayResult.length; i++) {
            if(arrayResult[i] === '/') {
                
                const antecessor = arrayResult[i - 1];
                const sucessor = arrayResult[i + 1];
                let resultadoOperacao;

                if (antecessor === null || antecessor === '' || sucessor === null || sucessor === '') {
                    return;
                }
                
                resultadoOperacao = parseFloat(antecessor) / parseFloat(sucessor);

                arrayResult.splice(i - 1, 3, resultadoOperacao);
            }
        }
    }

    while(arrayResult.includes('+')) {
        for(let i = 0; i < arrayResult.length; i++) {
            if(arrayResult[i] === '+') {
                
                const antecessor = arrayResult[i - 1];
                const sucessor = arrayResult[i + 1];
                let resultadoOperacao;

                if (antecessor === null || antecessor === '' || sucessor === null || sucessor === '') {
                    return;
                }
                
                resultadoOperacao = parseFloat(antecessor) + parseFloat(sucessor);

                arrayResult.splice(i - 1, 3, resultadoOperacao);
            }
        }
    }
    while(arrayResult.includes('-')) {
        for(let i = 0; i < arrayResult.length; i++) {
            if(arrayResult[i] === '-') {
                
                const antecessor = arrayResult[i - 1];
                const sucessor = arrayResult[i + 1];
                let resultadoOperacao;

                if (antecessor === null || antecessor === '' || sucessor === null || sucessor === '') {
                    return;
                }
                
                resultadoOperacao = parseFloat(antecessor) - parseFloat(sucessor);

                arrayResult.splice(i - 1, 3, resultadoOperacao);
            }
        }
    }

    inputDisplay.value = arrayResult[0];
}

function realizarCalculosOrdenadamente(array, operador) {
    

}