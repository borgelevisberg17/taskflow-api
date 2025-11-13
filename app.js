const express = require("express");
const cors = require("cors");
const { listAllTasks, insertTask, updateTask, deleteOne } = require("./data/db");

const app = express();
app.use(cors());
app.use(express.json()); 
// === Rotas da API ===

// GET /tasks → lista todas as tarefas
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await listAllTasks();
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao listar tarefas." });
    }
});

// POST /tasks → cria nova tarefa
app.post("/tasks", async (req, res) => {
    try {
        const result = await insertTask(req.body);
        res.status(201).json({
            message: "Tarefa criada com sucesso!",
            id: result.insertedId
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

// PUT /tasks/:id → atualiza uma tarefa
app.put("/tasks/:id", async (req, res) => {
    try {
        const updated = await updateTask(req.params.id, req.body);
        res.status(200).json({ message: "Tarefa atualizada!", task: updated });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

// DELETE /tasks/:id → deleta uma tarefa
app.delete("/tasks/:id", async (req, res) => {
    try {
        const result = await deleteOne(req.params.id);
        res.status(200).json({
            message: "Tarefa deletada com sucesso!",
            result
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
    }
});

// === Middleware de rota inexistente ===
app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada." });
});

// === Inicia o servidor ===
const PORT = 3000;
app.listen(PORT, () =>
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
);
