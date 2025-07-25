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
            const comprimentoInputDisplay = inputDisplay.value.length;
            alert(inputDisplay.value.slice());
            // inputDisplay.value = inputDisplay.value.slice(-1);
        }

        if (type === 'numero') {
            inputDisplay.value += value;
            isOperador = false;
        }

        if (type === 'decimal') {
            const armazenaTxtInputDisplay = inputDisplay.value;
            let temPonto = false;
            for(let i = 0; i < armazenaTxtInputDisplay.length; i++) {
                if(armazenaTxtInputDisplay[i] === '.') {
                    temPonto = true;
                    break;
                } 
            }

            if(temPonto === false) {
                inputDisplay.value += value;
            }
        }
        
        if(type === 'operador' && isOperador === false) {
            inputDisplay.value += value;
        }

        if(type === 'operador') {
            isOperador = true;
        }

        // 55*2+3/4
        if(type === 'igual') {
            let partes = inputDisplay.value.split('*');
            alert(partes);
        }
    });
});

