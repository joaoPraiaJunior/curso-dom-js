(function () {

    'use strict';

    const elementos = {
        botaoDeAdicionarTarefa: '[data-js="adicionar-tarefa"]',
        formularioDeAdicaoDeTarefa: '[data-js="formulario-add-tarefa"]',
        areaDeTexto: '[data-js="area-de-texto"]',
        listaDeTarefas: '[data-js="lista-tarefas"]',
    }

    const botaoDeAdicionarTarefa = document.querySelector(`${elementos.botaoDeAdicionarTarefa}`);
    const formularioDeAdicaoDeTarefa = document.querySelector(`${elementos.formularioDeAdicaoDeTarefa}`);
    const areaDeTexto = document.querySelector(`${elementos.areaDeTexto}`);
    const listaDeTarefas = document.querySelector(`${elementos.listaDeTarefas}`);
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    botaoDeAdicionarTarefa.addEventListener('click', () => {
        formularioDeAdicaoDeTarefa.classList.toggle('hidden');
    });

    formularioDeAdicaoDeTarefa.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const descricaoDaTarefa = areaDeTexto.value;
        const tarefa = {
            descricao: descricaoDaTarefa,
        }

        salvaTarefa(tarefa);
    });

    function salvaTarefa(tarefa) {
        const elementoTarefa = criaElementoTarefa(tarefa);
        listaDeTarefas.append(elementoTarefa);
        tarefas.push(tarefa);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
        areaDeTexto.value = '';
        formularioDeAdicaoDeTarefa.classList.add('hidden');
    }

    function criaElementoTarefa(tarefa) {
        const li = document.createElement('li');
        li.classList.add('app__section-task-list-item');
        const svg = document.createElement('svg');
        svg.innerHTML = `
            <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
                <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
            </svg>
        `;
        const paragrafo = document.createElement('p');
        paragrafo.classList.add('app__section-task-list-item-description');
        paragrafo.textContent = tarefa.descricao;
        const botao = document.createElement('button');
        botao.classList.add('app_button-edit');
        const imagemDoBotao = document.createElement('img');
        imagemDoBotao.src = './imagens/edit.png';

        botao.append(imagemDoBotao);
        li.append(svg, paragrafo, botao);

        return li
    }

    tarefas.forEach(tarefa => {
        const elementoTarefa = criaElementoTarefa(tarefa);
        listaDeTarefas.append(elementoTarefa);
    });

})();