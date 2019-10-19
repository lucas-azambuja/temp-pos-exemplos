const express = require('express')

const app = express()
app.use(express.json())

const db = {}
let idAtual = 0

app.get('/api/:username/tarefas', (req, res) => {
    const tarefas = db[req.params.username] || []
    res.json({
        sucesso: true,
        username: req.params.username,
        tarefas
    })
})

app.put('/api/:username/tarefas', (req, res) => {
    const descricao = req.body.descricao
    const feito = req.body.feito || false
    const data = new Date()

    if (!descricao) {
        res.json({
            sucesso: false,
            mensagem: 'O campo descrição é obrigatório'
        })
        return
    }

    const tarefas = db[req.params.username] || []
    tarefas.push({
        id: ++idAtual,
        descricao,
        feito,
        data
    })

    db[req.params.username] = tarefas

    res.json({
        sucesso: true,
        username: req.params.username,
        tarefas
    })
})

app.delete('/api/:username/tarefas/:id', (req, res) => {
    let tarefas = db[req.params.username] || []

    const existe = tarefas.find(x => x.id == req.params.id)
    if(!existe) {
        res.json({
            sucesso: false,
            mensagem: `A tarefa id ${req.params.id} não existe para o usuário ${req.params.username}`
        })
        return
    }

    tarefas = tarefas.filter(x => x.id != req.params.id)
    db[req.params.username] = tarefas

    res.json({
        sucesso: true,
        mensagem: `A tarefa ${req.params.id} foi excluída com sucesso`,
        username: req.params.username,
        tarefas
    })
})

app.patch('/api/:username/tarefas/:id', (req, res) => {
    const username = req.params.username
    const id = req.params.id
    const feito = req.body.feito
    const descricao = req.body.descricao

    let tarefas = db[username] || []

    const existe = tarefas.find(x => x.id == id)
    if(!existe) {
        res.json({
            sucesso: false,
            mensagem: `A tarefa id ${req.params.id} não existe para o usuário ${req.params.username}`
        })
        return
    }

    const tarefa = tarefas.find(x => x.id == id)
    tarefa.feito = feito || tarefa.feito
    tarefa.descricao = descricao || tarefa.descricao

    res.json({
        sucesso: true,
        mensagem: `A tarefa ${req.params.id} foi atualizada com sucesso`,
        username: req.params.username,
        tarefas
    })
})

app.listen(3000)