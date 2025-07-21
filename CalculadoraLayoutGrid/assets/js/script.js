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

        if (type === 'numero') {
            inputDisplay.value += value;
        }
        
        if (type === 'operador') {
            if(inputDisplay.value === '') {
                return;
            }
            
            const lastChar = inputDisplay.value.slice(-1);
      
            if(typeof lastChar === '') {
                alert('Você não pode inserir dois operadores seguidos.');
            }

        }
    });
});

