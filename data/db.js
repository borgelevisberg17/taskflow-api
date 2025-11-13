const { MongoClient, ObjectId } = require("mongodb");
const Joi = require("joi");

// === Configuração de conexão ===
const url = "mongodb://borge:senha@localhost:5348/taskdb";
const dbName = "taskdb";

let db;

// Função para conectar ao MongoDB
async function connect() {
    if (db) return db;
    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });
        db = client.db(dbName);
        console.log("✅ Conectado ao MongoDB com sucesso!");
        return db;
    } catch (err) {
        console.error("❌ Erro ao conectar ao MongoDB:", err);
        throw err;
    }
}

// === Esquema de validação com Joi ===
const taskSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(300).allow(""),
    done: Joi.boolean().default(false),
    priority: Joi.string().valid("alta", "média", "baixa").default("média"),
    createdAt: Joi.date().default(() => new Date(), "data atual")
});

// === Funções de CRUD ===

// Listar todas as tasks
async function listAllTasks() {
    try {
        const database = await connect();
        return await database.collection("tasks").find({}).toArray();
    } catch (err) {
        console.error("Erro ao listar tarefas:", err);
        throw err;
    }
}

// Inserir nova task com validação
async function insertTask(task) {
    try {
        const { error, value } = taskSchema.validate(task);
        if (error) throw new Error(`Validação falhou: ${error.message}`);

        const database = await connect();
        return await database.collection("tasks").insertOne(value);
    } catch (err) {
        console.error("Erro ao inserir tarefa:", err);
        throw err;
    }
}

// Atualizar task existente
async function updateTask(id, updatedTask) {
    try {
        const { error, value } = taskSchema.validate(updatedTask, { allowUnknown: true });
        if (error) throw new Error(`Validação falhou: ${error.message}`);

        const database = await connect();
        const result = await database
            .collection("tasks")
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: value },
                { returnDocument: "after" }
            );

        if (!result.value) throw new Error("Tarefa não encontrada.");
        return result.value;
    } catch (err) {
        console.error("Erro ao atualizar tarefa:", err);
        throw err;
    }
}

// Deletar task por ID
async function deleteOne(id) {
    try {
        const database = await connect();
        const result = await database.collection("tasks").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) throw new Error("Tarefa não encontrada para deletar.");
        return result;
    } catch (err) {
        console.error("Erro ao deletar tarefa:", err);
        throw err;
    }
}

// Fechar conexão (opcional)
async function closeConnection() {
    if (db) {
        await db.client?.close();
        console.log("🔒 Conexão com MongoDB encerrada.");
    }
}

// === Exportações ===
module.exports = {
    listAllTasks,
    insertTask,
    updateTask,
    deleteOne,
    closeConnection
};