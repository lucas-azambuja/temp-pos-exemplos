// const API_BASE = 'https://teste-fipp-api-tarefas.herokuapp.com'

const API_BASE = 'http://localhost:3001'
const USERNAME = 'lucas'

const bEnviar = document.querySelector("#botao-enviar")

bEnviar.addEventListener('click', event => {
    event.preventDefault()

    const form = document.querySelector("#form")
    const descricao = form.descricao.value

    fetch(`${API_BASE}/api/${USERNAME}/tarefas`, 
	{ 
		method: 'PUT', 
		headers: {
      		'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	}, 
		body: JSON.stringify({ descricao }), 
		mode: 'cors'
    }).then(atualizaTabela)
})

function buscarTarefas() {
    return new Promise((resolve, reject) => {
        fetch(`${API_BASE}/api/${USERNAME}/tarefas`)
        .then(x => x.json())
        .then(resposta => {
            resolve(resposta)
        })
    })
}

function adicionaNaTabela({ id, descricao, feito, data }) {
    const tabela = document.querySelector('#lista-tarefas')
    const tr = document.createElement('tr')
    const tdData = document.createElement('td')
    const tdDescricao = document.createElement('td')
    const tdCheckbox = document.createElement('td')

    tdData.textContent = data
    tdDescricao.textContent = descricao
    tr.dataset.id = id

    tr.appendChild(tdData)
    tr.appendChild(tdDescricao)
    tr.appendChild(tdCheckbox)

    tabela.appendChild(tr)
}

function atualizaTabela() {
    buscarTarefas()
        .then(resposta => {
            const tabela = document.querySelector('#lista-tarefas')
            tabela.innerHTML = ''
            resposta.tarefas.forEach(adicionaNaTabela)
        })
}

atualizaTabela()

