(function () {

    'use strict';

    const elementos = {
        botaoDeAdicionarTarefa: '[data-js="adicionar-tarefa"]',
        formularioDeAdicaoDeTarefa: '[data-js="formulario-add-tarefa"]',
        areaDeTexto : '[data-js="area-de-texto"]',
    }

    const botaoDeAdicionarTarefa = document.querySelector(`${elementos.botaoDeAdicionarTarefa}`);
    const formularioDeAdicaoDeTarefa = document.querySelector(`${elementos.formularioDeAdicaoDeTarefa}`);

    botaoDeAdicionarTarefa.addEventListener('click', function () {
        formularioDeAdicaoDeTarefa.classList.toggle('hidden');
    });

})();