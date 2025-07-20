// Executar quando a página carregar

document.addEventListener("DOMContentLoaded", () => {
  const btnAdicionarProdutos = document.getElementById("btnAdicionarProdutos");
  btnAdicionarProdutos.addEventListener("click", abrirModal);

  const btnFechar = document.getElementById("closeModalBtn");
  const btnCancelar = document.getElementById("btnCancelar");
  const btnAdicionarProdutoAoEstoque = document.getElementById(
    "btnAdicionarProdutoAoEstoque"
  );

  btnFechar.addEventListener("click", fecharModal);
  btnCancelar.addEventListener("click", fecharModal);
  btnAdicionarProdutoAoEstoque.addEventListener("click", (event) => {
    event.preventDefault();
    criarCardProduto();
  });

  const cardContainer = document.querySelector(".card_container");
  
  cardContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("btnRemover")) {
          removerProdutosCarrinhoCard(event.target);
        } else if (event.target.classList.contains("btnAdicionar")) {
            adicionarProdutosAoCarrinhoCard(event.target);
        }
    });
    
    
  cardContainer.addEventListener("click", (event) => {
    if (event.target.id === "btnAdicionarAoCarrinho") {
      adicionarAoCarrinho(event.target);
    }
  });

  const carrinho = document.querySelector(".carrinho");

  carrinho.addEventListener("click", (event) => {
    if (event.target.classList.contains("btnRemover")) {
      removerProdutosCarrinhoCompras(event.target);
    } else if (event.target.classList.contains("btnAdicionar")) {
      adicionarProdutosAoCarrinhoCompras(event.target);
    }
  });
});

function abrirModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
  limparCampos();
}

function fecharModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  limparCampos();
}

function criarCardProduto() {
  const nomeProduto = document.getElementById("nomeProduto").value;
  const descricaoProduto = document.getElementById("descricaoProduto").value;
  const valorProduto = document.getElementById("valorProduto").value;
  const cardContainer = document.querySelector(".card_container");

  const alertaCampoInvalido = document.getElementsByClassName(
    "alertaCampoInvalido"
  );

  for (let alerta of alertaCampoInvalido) {
    alerta.style.display = "none";
  }

  if (!nomeProduto || nomeProduto.trim() === "") {
    alertaCampoInvalido[0].style.display = "block";
    return;
  }

  if (!descricaoProduto || descricaoProduto.trim() === "") {
    alertaCampoInvalido[1].style.display = "block";
    return;
  }

  if (
    !valorProduto ||
    isNaN(parseFloat(valorProduto)) ||
    parseFloat(valorProduto) <= 0
  ) {
    alertaCampoInvalido[2].style.display = "block";
    return;
  }

  const novoCardProduto = document.createElement("article");
  novoCardProduto.classList.add("card_produto");

  novoCardProduto.innerHTML = `
        <h3>${nomeProduto}</h3>
        <img src="./assets/images/7081401_3548737-removebg-preview.png" alt="ImgProduto" id="imagemProdutoCard">
        <p>${descricaoProduto}</p>
        <p>Preço: R$ ${parseFloat(valorProduto).toFixed(2)}</p>
        <div class="addRemove">
            <button class="btnRemover">-</button>
                <p class="quantidadeProdutoCard">1</p>
            <button class="btnAdicionar">+</button>
        </div>
        <button id="btnAdicionarAoCarrinho">Adicionar ao Carrinho</button>
        `;
        
        cardContainer.appendChild(novoCardProduto);
  fecharModal();
}

function limparCampos() {
  document.getElementById("nomeProduto").value = "";
  document.getElementById("descricaoProduto").value = "";
  document.getElementById("valorProduto").value = "";
}

function removerProdutosCarrinhoCard(botao) {
    const quantidadeProdutoCard = botao.nextElementSibling;
    
    if (quantidadeProdutoCard) {
        let quantidade = parseInt(quantidadeProdutoCard.textContent);
        if (quantidade > 1) {
            quantidade--;
            quantidadeProdutoCard.textContent = quantidade;
        }
    }
}

function adicionarProdutosAoCarrinhoCard(botao) {
  const quantidadeProdutoCard = botao.previousElementSibling;

  if (quantidadeProdutoCard) {
    let quantidade = parseInt(quantidadeProdutoCard.textContent);
    quantidade++;
    quantidadeProdutoCard.textContent = quantidade;
  }
}

function removerProdutosCarrinhoCompras(botao) {
  const quantidadeProdutoCard = botao.nextElementSibling;
  const liProduto = botao.closest(".itemCarrinho").querySelector('li');
  if (quantidadeProdutoCard && liProduto) {
    let quantidade = parseInt(quantidadeProdutoCard.textContent);
    if (quantidade == 1) {
      const itemCarrinho = botao.closest(".itemCarrinho");
      itemCarrinho.remove();
    } else {
      quantidade--;
      quantidadeProdutoCard.textContent = quantidade;

      const textoLi = liProduto.textContent;
      const nomeProduto = textoLi.split(' - R$')[0];

      const valorTotalAtual = parseFloat(textoLi.split(' - R$ ')[1].replace(',', '.'));
      const valorUnitario = valorTotalAtual / (quantidade + 1);
      const novoValorTotal = (valorTotalAtual - valorUnitario).toFixed(2).replace('.', ',');
      liProduto.textContent = `${nomeProduto} - R$ ${novoValorTotal}`;
    }
  }
}

function adicionarProdutosAoCarrinhoCompras(botao) {
  const quantidadeProdutoCard = botao.previousElementSibling;
  const liProduto = botao.closest(".itemCarrinho").querySelector('li');
  if (quantidadeProdutoCard && liProduto) {
    let quantidade = parseInt(quantidadeProdutoCard.textContent);
    quantidade++;
    quantidadeProdutoCard.textContent = quantidade;

    const textoLi = liProduto.textContent;
    const nomeProduto = textoLi.split(' - R$')[0];
    const valorTotalAtual = parseFloat(textoLi.split(' - R$ ')[1].replace(',', '.'));
    const valorUnitario = valorTotalAtual / (quantidade - 1);

    const novoValorTotal = (valorUnitario * quantidade).toFixed(2).replace('.', ',');
    liProduto.textContent = `${nomeProduto} - R$ ${novoValorTotal}`;
  }
}


function adicionarAoCarrinho(botao) {
  const cardProduto = botao.closest('.card_produto');
  
  const nomeProduto = cardProduto.querySelector('h3').textContent;
  const precoElement = cardProduto.querySelector('p:nth-of-type(2)');
  const valorTexto = precoElement.textContent.replace('Preço: R$ ', '').replace(',', '.');
  const valorProdutoNumerico = parseFloat(valorTexto);
  const quantidadeProdutoCard = cardProduto.querySelector('.quantidadeProdutoCard').textContent;
  
  const listaCarrinho = document.querySelector(".listaCarrinho");

  const itensExistentes = listaCarrinho.querySelectorAll('.itemCarrinho');
  let produtoExistente = null;

  for (let item of itensExistentes) {
    const nomeNoCarrinho = item.querySelector('li').textContent.split(' - R$')[0];
    if (nomeNoCarrinho === nomeProduto) {
      produtoExistente = item;
      break;
    }
  }

  if (produtoExistente) {
    const quantidadeAtual = parseInt(produtoExistente.querySelector('p').textContent);
    const novaQuantidade = quantidadeAtual + parseInt(quantidadeProdutoCard);
    const novoValorTotal = (valorProdutoNumerico * novaQuantidade).toFixed(2).replace(".", ",");
    
    produtoExistente.querySelector('p').textContent = novaQuantidade;
    produtoExistente.querySelector('li').textContent = `${nomeProduto} - R$ ${novoValorTotal}`;
  } else {
    const itemCarrinho = document.createElement("div");
    itemCarrinho.classList.add("itemCarrinho");

    const valorTotal = (valorProdutoNumerico * parseFloat(quantidadeProdutoCard)).toFixed(2).replace(".", ",");

    itemCarrinho.innerHTML = `
        <li>${nomeProduto} - R$ ${valorTotal}</li>
        <div class="addRemoveCarrinho">
            <button class="btnRemover">-</button>
            <p>${quantidadeProdutoCard}</p>
            <button class="btnAdicionar">+</button>
        </div>
    `;
    listaCarrinho.appendChild(itemCarrinho);
  }
  cardProduto.querySelector(".quantidadeProdutoCard").textContent = "1";
}

function finalizarCompra() {}
