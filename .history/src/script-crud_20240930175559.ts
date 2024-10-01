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

	estadoInicial.tarefas.forEach((tarefa) => {
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

		elementoListaDeTarefas?.appendChild(li);
	});
}
