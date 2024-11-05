// Definindo os elementos DOM
const descricaoInput = document.getElementById("descricao");
const valorInput = document.getElementById("valor");
const categoriaInput = document.getElementById("categoria");
const adicionarButton = document.getElementById("adicionar");
const listaGastos = document.getElementById("listaGastos");
const totalGastos = document.getElementById("totalGastos");

// Carregar gastos do localStorage
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

// Função para adicionar um novo gasto
function adicionarGasto() {
    const descricao = descricaoInput.value;
    const valor = parseFloat(valorInput.value);
    const categoria = categoriaInput.value;

    if (!isNaN(valor)) {
        //   if (descricao && !isNaN(valor) && categoria) {
        const gasto = { id: Date.now(), descricao, valor, categoria };
        gastos.push(gasto);
        localStorage.setItem("gastos", JSON.stringify(gastos));
        limparCampos();
        atualizarLista();
        atualizarTotal();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para remover um gasto
function removerGasto(id) {
    gastos = gastos.filter((gasto) => gasto.id !== id);
    localStorage.setItem("gastos", JSON.stringify(gastos));
    atualizarLista();
    atualizarTotal();
}

// Função para calcular o total de gastos
function calcularTotal() {
    return gastos.reduce((total, gasto) => total + gasto.valor, 0).toFixed(2);
}

// Função para atualizar a lista de gastos no DOM
function atualizarLista() {
    listaGastos.innerHTML = "";
    gastos.forEach((gasto) => {
        const item = document.createElement("li");
        item.classList.add("item");
        item.innerHTML = `
      <span class="descricao">${gasto.descricao}</span>
      <span class="valor">R$ ${gasto.valor.toFixed(2)}</span>
      <span class="categoria">${gasto.categoria}</span>
      <span class="categoria" onclick="removerGasto(${gasto.id})">X</span>
    `;
        listaGastos.appendChild(item);
    });
}

// Função para atualizar o total de gastos no DOM
function atualizarTotal() {
    totalGastos.textContent = calcularTotal();
}

// Função para limpar os campos de entrada
function limparCampos() {
    descricaoInput.value = "";
    valorInput.value = "";
    categoriaInput.value = "";
}

// Event listener para o botão adicionar
adicionarButton.addEventListener("click", adicionarGasto);

// Carregar e exibir os dados ao iniciar
document.addEventListener("DOMContentLoaded", () => {
    atualizarLista();
    atualizarTotal();
});
