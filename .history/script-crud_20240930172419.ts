const elementos = {
	// botaoDeAdicionarTarefa: '[data-js="adicionar-tarefa"]',
	// formularioDeAdicaoDeTarefa: '[data-js="formulario-add-tarefa"]',
	// areaDeTexto: '[data-js="area-de-texto"]',
	listaDeTarefas: '[data-js="lista-tarefas"]',
	// botaoCancelar: '[data-js="botao-cancelar"]',
	// botaoDeletar: '[data-js="botao-deletar"]',
	// taskEmAndamnento: '[data-js="task-andamento"]',
	// botaoRemoverTasksConcluidas: '[data-js="remover-tasks-concluidas"]',
	// botaoRemoverTodasTasks: '[data-js="remover-todas-tasks"]',
};

interface Tarefa {
	descricao: string;
	concluida: boolean;
}

interface EstadoAplicacao {
	tarefas: Tarefa[];
	tarefaSelecionada: Tarefa | null;
}

let estadoInicial: EstadoAplicacao = {
	tarefas: [
		{
			descricao: 'Tarefa concluída',
			concluida: true,
		},
		{
			descricao: 'Tarefa pendente 1',
			concluida: false,
		},
		{
			descricao: 'Tarefa pendente 2',
			concluida: false,
		},
	],
	tarefaSelecionada: null,
};

function selecionarTarefa(estado: EstadoAplicacao, tarefa: Tarefa): EstadoAplicacao {
	return {
		...estado,
		tarefaSelecionada: tarefa === estado.tarefaSelecionada ? null : tarefa,
	};
}

function atualiarUI() {
	const elementoListaDeTarefas = document.querySelector(elementos.listaDeTarefas);

	if (elementoListaDeTarefas) {
		elementoListaDeTarefas.innerHTML = '';
	}

	estadoInicial.tarefas.forEach((tarefa, index) => {
		const li = document.createElement('li');
		li.textContent = tarefa.descricao;
		li.style.textDecoration = tarefa.concluida ? 'line-through' : 'none';
		li.style.cursor = 'pointer';

		if (tarefa === estadoInicial.tarefaSelecionada) {
			li.style.backgroundColor = 'lightblue';
		}

		li.addEventListener('click', () => {
			estadoInicial = selecionarTarefa(estadoInicial, tarefa);
			atualiarUI();
		});

		if (elementoListaDeTarefas) {
			elementoListaDeTarefas.appendChild(li);
		}
	});
}
