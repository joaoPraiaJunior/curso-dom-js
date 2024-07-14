(function () {

    'use strict';

    const elementos = {
        botaoDeAdicionarTarefa: '[data-js="adicionar-tarefa"]',
        formularioDeAdicaoDeTarefa: '[data-js="formulario-add-tarefa"]',
        areaDeTexto: '[data-js="area-de-texto"]',
    }

    const botaoDeAdicionarTarefa = document.querySelector(`${elementos.botaoDeAdicionarTarefa}`);
    const formularioDeAdicaoDeTarefa = document.querySelector(`${elementos.formularioDeAdicaoDeTarefa}`);
    const areaDeTexto = document.querySelector(`${elementos.areaDeTexto}`);
    const tarefas = [];

    botaoDeAdicionarTarefa.addEventListener('click', () => {
        formularioDeAdicaoDeTarefa.classList.toggle('hidden');
    });

    formularioDeAdicaoDeTarefa.addEventListener('submit', (evento) => {
        evento.preventDefault();
        const descricaoDaTarefa = areaDeTexto.value;
        const tarefa = {
            descricao: descricaoDaTarefa,
        }

        tarefas.push(tarefa);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    });

    function criaElementoTarefa(tarefa) {
        const li = document.createElement('li');
        li.classList.add('app__section-task-list-item');
        const svg = document.createElement('svg');
        svg.innerHTML =  `
        <svg>
            <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
                <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
            </svg>
        </svg>
        `;
        const paragrafo = document.createElement('p');
        paragrafo.textContent = tarefa.descricao;

        const botao = document.createElement('button');
        const imagemDoBotao = document.createElement('img');
        imagemDoBotao.src = './imagens/edit.png'; 
    }

})();