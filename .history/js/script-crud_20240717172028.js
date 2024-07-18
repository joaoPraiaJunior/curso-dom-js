(function () {

    'use strict';

    const elementos = {
        botaoDeAdicionarTarefa: '[data-js="adicionar-tarefa"]',
        formularioDeAdicaoDeTarefa: '[data-js="formulario-add-tarefa"]',
        areaDeTexto: '[data-js="area-de-texto"]',
        listaDeTarefas: '[data-js="lista-tarefas"]',
        botaoCancelar: '[data-js="botao-cancelar"]',
        taskEmAndamnento: '[data-js="task-andamento"]',
        botaoRemoverTasksConcluidas: '[data-js="remover-tasks-concluidas"]',
        botaoRemoverTodasTasks: '[data-js="remover-todas-tasks"]',
    }

    const botaoDeAdicionarTarefa = document.querySelector(`${elementos.botaoDeAdicionarTarefa}`);
    const formularioDeAdicaoDeTarefa = document.querySelector(`${elementos.formularioDeAdicaoDeTarefa}`);
    const areaDeTexto = document.querySelector(`${elementos.areaDeTexto}`);
    const listaDeTarefas = document.querySelector(`${elementos.listaDeTarefas}`);
    const botaoCancelar = document.querySelector(`${elementos.botaoCancelar}`);
    const taskEmAndamnento = document.querySelector(`${elementos.taskEmAndamnento}`);
    const botaoRemoverTasksConcluidas = document.querySelector(`${elementos.botaoRemoverTasksConcluidas}`);
    const botaoRemoverTodasTasks = document.querySelector(`${elementos.botaoRemoverTodasTasks}`);

    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    let tarefaSelecionada = null;
    let liDaTarefaSelecionada = null;

    function atualizaTarefasNoLocalStorage() {
        localStorage.setItem('tarefas', JSON.stringify(tarefas))
    }


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

    botaoCancelar.addEventListener('click', () => {
        formularioDeAdicaoDeTarefa.classList.add('hidden');
        areaDeTexto.value = '';
    });

    function salvaTarefa(tarefa) {
        const elementoTarefa = criaElementoTarefa(tarefa);
        listaDeTarefas.append(elementoTarefa);
        tarefas.push(tarefa);
        atualizaTarefasNoLocalStorage()
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

        atualizaTarefa(botao, paragrafo, tarefa);
        selecionaTarefa(li, tarefa);

        return li
    }

    tarefas.forEach(tarefa => {
        const elementoTarefa = criaElementoTarefa(tarefa);
        listaDeTarefas.append(elementoTarefa);
    });

    function atualizaTarefa(botao, paragrafo, tarefa) {
        botao.onclick = (evento) => {
            const descricaoEditada = prompt('Digite a nova descrição da tarefa');
            if (descricaoEditada !== null && descricaoEditada.trim() !== '') {
                paragrafo.textContent = descricaoEditada;
                tarefa.descricao = descricaoEditada;
                atualizaTarefasNoLocalStorage();
                alert("Tarefa atualizada com sucesso!");
            } else {
                alert("A descrição da tarefa não pode ser vazia!");
            }

            evento.stopPropagation();
        }
    }

    function selecionaTarefa(li, tarefa) {
        if(tarefa.completa) {
            li.classList.add('app__section-task-list-item-complete');
            li.querySelector('button').setAttribute('disabled', 'true');
        } else {
            li.onclick = () => {
                document.querySelectorAll('.app__section-task-list-item-active')
                .forEach(elemento => {
                    elemento.classList.remove('app__section-task-list-item-active');
                });
    
                if(tarefaSelecionada === tarefa) {
                    tarefaSelecionada = null;
                    liDaTarefaSelecionada = null;
                    taskEmAndamnento.textContent = '';
                    return;
                }
                tarefaSelecionada = tarefa;
                liDaTarefaSelecionada = li;
                taskEmAndamnento.textContent = tarefa.descricao;
                li.classList.add('app__section-task-list-item-active');
            }
        }
    }

    document.addEventListener('FocoConcluido', () => {
        if(tarefaSelecionada && liDaTarefaSelecionada) {
            liDaTarefaSelecionada.classList.remove('app__section-task-list-item-active');
            liDaTarefaSelecionada.classList.add('app__section-task-list-item-complete');
            liDaTarefaSelecionada.querySelector('button').setAttribute('disabled', 'true');
            tarefaSelecionada.completa = true;
            atualizaTarefasNoLocalStorage();
        }
    });

    const removerTarefas = (somenteCompletas) => {
        const seletorDeTarefasConcluidas = somenteCompletas ? '.app__section-task-list-item-complete' : ".app__section-task-list-item";
        const tarefasConcluidas = document.querySelectorAll(seletorDeTarefasConcluidas);
        tarefasConcluidas.forEach(tarefa => {
            tarefa.remove();
        });

        tarefas = somenteCompletas ? tarefas.filter(tarefa => !tarefa.completa) : [];
        atualizaTarefasNoLocalStorage();
    }

    botaoRemoverTasksConcluidas.addEventListener('click', () => {
        removerTarefas(true);
    });
    botaoRemoverTodasTasks.addEventListener('click', () => {
        removerTarefas(false);
    });

})();