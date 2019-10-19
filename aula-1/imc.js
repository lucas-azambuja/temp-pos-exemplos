let tabela = document.querySelector('#tabela')
let pacientes = document.querySelectorAll('.paciente')

let listaPacientes = []

let idAtual = 0

function calculaImc(peso, altura) {
    var erros = []
    if (peso < 0 || peso >= 500) {
        erros.push('peso')
    }

    if (altura < 0 || altura >= 2.5) {
        erros.push('altura')
    }

    if (erros.length) {
        return `verifique os campos: ${erros.join(', ')}`
    }

    let imc = peso / ( altura * altura )
    return imc.toFixed(2)
}

let adicionarEventoDeRemoverLinha = linha => {
    linha.addEventListener('dblclick', (event) => {
        const tr = event.target.parentNode
        const id = tr.dataset.id
        if (confirm('Tem certeza que deseja excluir?')) {
            linha.remove()
            listaPacientes = listaPacientes
                .filter(paciente => paciente.id != id)
            salvarEstado()
        }
    })
}

for (let i = 0; i < pacientes.length; i++) {
    let paciente = pacientes[i]
    let tdPeso = paciente.querySelector('.info-peso')
    let tdAltura = paciente.querySelector('.info-altura')
    let peso = tdPeso.textContent
    let altura = tdAltura.textContent
    let tdImc = paciente.querySelector('.info-imc')
    tdImc.textContent = calculaImc(peso, altura)
}

pacientes.forEach(adicionarEventoDeRemoverLinha)

function adicionaPacienteNaTabela(id, peso, altura, nome) {
    let trPaciente = document.createElement('tr')
    adicionarEventoDeRemoverLinha(trPaciente)
    let tdNome = document.createElement('td')
    let tdPeso = document.createElement('td')
    let tdAltura = document.createElement('td')
    let tdImc = document.createElement('td')
    
    tdNome.textContent = nome
    tdAltura.textContent = altura
    tdPeso.textContent = peso
    tdImc.textContent = calculaImc(peso, altura)
    
    trPaciente.appendChild(tdNome)
    trPaciente.appendChild(tdPeso)
    trPaciente.appendChild(tdAltura)
    trPaciente.appendChild(tdImc)
    trPaciente.dataset.id = id

    let tbody = tabela.querySelector('tbody')
    tbody.appendChild(trPaciente)
}

function salvarEstado() {
    localStorage.setItem(
        "listaPacientes", 
        JSON.stringify(listaPacientes)
    )
}

function adicionaPaciente(event) {
    event.preventDefault()

    let formulario = document.querySelector('#formulario')
    let peso = formulario.iPeso.value
    let altura = formulario.iAltura.value
    let nome = formulario.iNome.value

    let erros = []
    if (!nome) {
        erros.push('nome')
    }
    if (!peso) {
        erros.push('peso')
    }
    if (!altura) {
        erros.push('altura')
    }

    if (erros.length) {
        alert(`Verifique os campos inválidos:\n${erros.join('\n')}`)
        return
    }

    const id = ++idAtual
    adicionaPacienteNaTabela(id, peso, altura, nome)

    listaPacientes.push({
        id,
        peso,
        nome,
        altura
    })

    salvarEstado()

    formulario.reset()
    formulario.iNome.focus()
}

let botaoAdicionar = document.querySelector('#bAdicionar')
botaoAdicionar.addEventListener('click', adicionaPaciente)

listaPacientes = 
    JSON.parse(localStorage.getItem("listaPacientes")) || [] 

listaPacientes.forEach(function adiciona(paciente) {
    adicionaPacienteNaTabela(
        paciente.id,
        paciente.peso, 
        paciente.altura, 
        paciente.nome)
    
        if (paciente.id > idAtual) {
            idAtual = paciente.id
        }
})



/*
function soma (n1, n2) {
    return n1 + n2
}

let soma = (n1, n2) => n1 + n2

let saudacao = nome => `Olá, ${nome}`

let funcao = () => {
    console.log('teste')
    return 1
}
*/