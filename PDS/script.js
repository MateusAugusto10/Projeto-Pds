// script.js
let listaAlunos = [];
let limiteAlunos = 0;

// Função para atualizar os resultados gerais
function atualizarResultado(mensagem, tipo) {
    const resultadoDiv = document.getElementById(tipo);
    resultadoDiv.textContent = mensagem; // Exibe a mensagem no local apropriado
}

// Função para listar todos os alunos cadastrados
function listarAlunos() {
    const listaAlunosDiv = document.getElementById("listaAlunos");
    listaAlunosDiv.innerHTML = ""; // Limpa o conteúdo anterior
    if (listaAlunos.length > 0) {
        listaAlunos.forEach(aluno => {
            const item = document.createElement("li");
            item.textContent = `Nome: ${aluno.nome}, Matrícula: ${aluno.matricula}, Idade: ${aluno.idade}`;
            listaAlunosDiv.appendChild(item);
        });
    } else {
        const item = document.createElement("li");
        item.textContent = "Nenhum aluno cadastrado.";
        listaAlunosDiv.appendChild(item);
    }
}

// Configurar limite de alunos
document.getElementById("configurarLimite").addEventListener("click", function () {
    const limite = parseInt(document.getElementById("limiteAlunos").value, 10);
    
    if (limite > 0) {
        limiteAlunos = limite;
        atualizarResultado(`Limite de ${limiteAlunos} alunos configurado com sucesso.`, "resultadoLimite");
    } else {
        atualizarResultado("Por favor, insira um número válido maior que zero para o limite.", "resultadoLimite");
    }
});

// Cadastrar aluno
document.getElementById("formCadastro").addEventListener("submit", function (e) {
    e.preventDefault();

    // Verifica se o limite de alunos foi atingido
    if (listaAlunos.length >= limiteAlunos) {
        atualizarResultado("Limite de alunos atingido. Não é possível cadastrar mais alunos.", "resultadoCadastro");
        return;
    }

    const nome = document.getElementById("nome").value;
    const matricula = document.getElementById("matricula").value;
    const idade = document.getElementById("idade").value;
    
    listaAlunos.push({ nome, matricula, idade });
    atualizarResultado(`Aluno ${nome} cadastrado com sucesso.`, "resultadoCadastro");
    
    e.target.reset();
    listarAlunos(); // Atualiza a lista de alunos após o cadastro
});

// Buscar aluno
document.getElementById("buscarAluno").addEventListener("click", function () {
    const criterio = document.getElementById("criterioBusca").value;
    const resultado = listaAlunos.filter(
        aluno => aluno.nome.includes(criterio) || aluno.matricula === criterio
    );
    
    if (resultado.length > 0) {
        let mensagem = "Alunos encontrados:";
        resultado.forEach(aluno => {
            mensagem += `\nNome: ${aluno.nome}, Matrícula: ${aluno.matricula}, Idade: ${aluno.idade}`;
        });
        atualizarResultado(mensagem, "resultadoBusca");
    } else {
        atualizarResultado("Nenhum aluno encontrado com o critério especificado.", "resultadoBusca");
    }
});

// Remover aluno
document.getElementById("removerAluno").addEventListener("click", function () {
    const matricula = document.getElementById("matriculaRemocao").value;
    const indice = listaAlunos.findIndex(aluno => aluno.matricula === matricula);

    if (indice !== -1) {
        const removido = listaAlunos.splice(indice, 1);
        atualizarResultado(`Aluno ${removido[0].nome} removido com sucesso.`, "resultadoRemocao");
        listarAlunos(); // Atualiza a lista de alunos após a remoção
    } else {
        atualizarResultado("Nenhum aluno encontrado com a matrícula especificada.", "resultadoRemocao");
    }
});

// Exibir a lista de alunos ao clicar no botão "Mostrar Alunos Cadastrados"
document.getElementById("mostrarAlunos").addEventListener("click", function () {
    listarAlunos(); // Exibe a lista de alunos
});
