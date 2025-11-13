# 🚀 TaskFlow API
![Version](https://img.shields.io/npm/v/taskflow-api)
![Version](https://img.shields.io/github/v/tag/borgelevisberg17/taskflow-api?label=version)
**TaskFlow API** é uma API RESTful desenvolvida em **Node.js** e **MongoDB** para gerenciar tarefas.  
Permite criar, listar, atualizar e deletar tarefas de forma rápida e segura. Ideal para apps de produtividade e projetos pessoais.

---

## 🔧 Tecnologias Utilizadas
- **Node.js** (v18+)
- **Express** (Framework web)
- **MongoDB** (Base de dados NoSQL)
- **Joi** (Validação de dados)
- **Cors** (Suporte a requisições cross-origin)

---

## ⚡ Funcionalidades
- Listar todas as tarefas (`GET /tasks`)
- Criar nova tarefa (`POST /tasks`)
- Atualizar tarefa existente (`PUT /tasks/:id`)
- Deletar tarefa (`DELETE /tasks/:id`)
- Validação de dados antes de inserir ou atualizar
- Tratamento de erros com mensagens claras
- Suporte a **SSH** para versionamento remoto

---

## 📂 Estrutura do Projeto

taskflow-api/ │ 
├── data/db.js               # Conexão com MongoDB e CRUD 
├── app.js           # Servidor Express e rotas
├── package.json 
└── node_modules/

---

## 🚀 Instalação e Uso

1. **Clona o repositório**
```bash
git clone http://github.com/borgelevisberg17/taskflow-api.git
cd taskflow-api
```
2. Instala as dependências


```bash
npm install
```
3. Configura MongoDB

Certifica que o MongoDB está rodando na porta configurada (padrão: 5348)

Ajusta usuário, senha e database no db.js se necessário


4. Inicia o servidor


```bash
node server.js
```
A API ficará disponível em: 
```
http://localhost:3000
```

---

* Endpoints

Método	Endpoint	Descrição	Corpo JSON (POST/PUT)

GET	/tasks	Lista todas as tarefas	—
POST	/tasks	Cria uma nova tarefa	{ title, description?, priority? }
PUT	/tasks/:id	Atualiza tarefa existente	{ title?, description?, done?, priority? }
DELETE	/tasks/:id	Deleta tarefa pelo ID	—


* Campos de Task

{
  "title": "Nome da tarefa",
  "description": "Detalhes da tarefa (opcional)",
  "done": false,
  "priority": "alta | média | baixa"
}


---

* Validação de Dados

title: obrigatório, string entre 3 e 100 caracteres

description: opcional, string até 300 caracteres

done: booleano, default false

priority: "alta", "média", "baixa", default "média"



---

* Segurança

Use SSH para versionamento seguro

Validação de dados com Joi

Tratamento de erros em todas as rotas

Não expor credenciais do MongoDB no repositório público

---

* Exemplo de Requisição

Criar tarefa
```bash
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"title":"Estudar Node.js","priority":"alta"}'
```
Atualizar tarefa
```bash
curl -X PUT http://localhost:3000/tasks/<ID> \
-H "Content-Type: application/json" \
-d '{"done":true}'
```
Deletar tarefa
```bash
curl -X DELETE http://localhost:3000/tasks/<ID>
```

---

* Autor

@borge.levisberg
Desenvolvedor Full Stack e entusiasta em Node.js e segurança.
