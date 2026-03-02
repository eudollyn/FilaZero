const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Dados em memória (Reinicia ao fechar o node)
let pedidos = [];
let produtos = [
    { id: 1, nome: "Heineken 6un", preco: "55.00" },
    { id: 2, nome: "Combo Jack Daniels", preco: "250.00" }
];
let contadorPedidos = 1;
let contadorProdutos = 3;

// --- ROTAS DE PRODUTOS ---
app.get('/produtos', (req, res) => res.json(produtos));

app.post('/produtos', (req, res) => {
    const novo = { id: contadorProdutos++, ...req.body };
    produtos.push(novo);
    res.json(novo);
});

app.put('/produtos/:id', (req, res) => {
    const index = produtos.findIndex(p => p.id == req.params.id);
    if (index !== -1) {
        produtos[index] = { id: Number(req.params.id), ...req.body };
        res.json(produtos[index]);
    }
});

app.delete('/produtos/:id', (req, res) => {
    produtos = produtos.filter(p => p.id != req.params.id);
    res.send("Removido");
});

// --- ROTAS DE PEDIDOS ---
app.get('/pedidos', (req, res) => res.json(pedidos));
app.post('/pedidos', (req, res) => {
    const pedido = { id: contadorPedidos++, ...req.body, status: "Preparando" };
    pedidos.push(pedido);
    res.json(pedido);
});
app.put('/pedidos/:id', (req, res) => {
    const pedido = pedidos.find(p => p.id == req.params.id);
    if (pedido) { pedido.status = "Pronto"; res.json(pedido); }
});

app.listen(3000, () => console.log("🚀 Servidor Full Online em http://localhost:3000"));