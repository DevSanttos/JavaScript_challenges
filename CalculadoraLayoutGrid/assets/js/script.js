document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector('.grid-container');
    const inputDisplay = document.getElementById('display');
    gridContainer.addEventListener('click', (event) => {
        const click = event.target;

        if (click.tagName !== 'BUTTON') {
            return;
        }

        const type = click.dataset.type;
        const value = click.dataset.value;
        
        if(type === 'limpar') {
            inputDisplay.value = '';
            return;
        }

        if(type === 'deletar') {
            const armazenaValorInputDisplay =  inputDisplay.value;
            let armazenaTxt = "";

            for(let i = 0; i < armazenaValorInputDisplay.length - 1; i++) {
                armazenaTxt += armazenaValorInputDisplay[i];
            }
            inputDisplay.value = armazenaTxt;
        }

        if (type === 'numero') {
            inputDisplay.value += value;
            isOperador = false;
        }

        if (type === 'decimal') {
            const armazenaTxtInputDisplay = inputDisplay.value;
            let ultimoNumeroValido = '';
            let temPonto = false;
    
            for(let i = 0; i < armazenaTxtInputDisplay.length; i++) {
                if(armazenaTxtInputDisplay[i] === '.') {
                    temPonto = true;
                    break;
                }
                ultimoNumeroValido = armazenaTxtInputDisplay[armazenaTxtInputDisplay.length - 1];
            }
            
            if(temPonto === false) {
                if(typeof parseFloat(ultimoNumeroValido) !== 'number' || ultimoNumeroValido === '') {
                    return;
                }
                inputDisplay.value += value;
            }
        }
        
        if(type === 'operador' && isOperador === false) {
            inputDisplay.value += value;
        }

        if(type === 'operador') {
            isOperador = true;
        }

        if(type === 'igual') {
            const armazenaInput = inputDisplay.value;
            const operadores = ['*', '/', '+', '-'];
            let arrayResult = [];
            let aux = '';
            //5*55

            for(let i = 0; i < armazenaInput.length; i++) {
                if(!operadores.includes(armazenaInput[i])) {
                    
                }
            }
        }
    });
});

