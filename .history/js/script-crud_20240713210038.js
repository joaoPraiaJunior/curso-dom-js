(function () {

    'use strict';

    const elementos = {
        botaoDeAdicionarTarefa: '[data-js="adicionar-tarefa"]',
        formularioDeAdicaoDeTarefa: '[data-js="formulario-add-tarefa"]',
        areaDeTexto : '[data-js="area-de-texto"]',
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
    });

})();