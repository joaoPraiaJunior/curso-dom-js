const elementos = {
	botaoDeAdicionarTarefa: '[data-js="adicionar-tarefa"]',
	formularioDeAdicaoDeTarefa: '[data-js="formulario-add-tarefa"]',
	areaDeTexto: '[data-js="area-de-texto"]',
	listaDeTarefas: '[data-js="lista-tarefas"]',
	botaoCancelar: '[data-js="botao-cancelar"]',
	botaoDeletar: '[data-js="botao-deletar"]',
	taskEmAndamnento: '[data-js="task-andamento"]',
	botaoRemoverTasksConcluidas: '[data-js="remover-tasks-concluidas"]',
	botaoRemoverTodasTasks: '[data-js="remover-todas-tasks"]',
};

interface Tarefa {
	descricao: string;
	concluida: boolean;
}

interface EstadoAplicacao {
	tarefas: Tarefa[];
	tarefaSelecionada: Tarefa | null;
	editando: boolean;
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
	editando: false,
};

function adicionarTarefa(estado: EstadoAplicacao, tarefa: Tarefa): EstadoAplicacao {
	return {
		...estado,
		tarefas: [...estado.tarefas, tarefa],
	};
}

function deletarTarefa(estado: EstadoAplicacao): EstadoAplicacao {
	if (estado.tarefaSelecionada) {
		const tarefas = estado.tarefas.filter((t) => t != estado.tarefaSelecionada);
		return { ...estado, tarefas, tarefaSelecionada: null, editando: false };
	} else {
		return estado;
	}
}

function deletarTodasTarefas(estado: EstadoAplicacao): EstadoAplicacao {
	return { ...estado, tarefas: [], tarefaSelecionada: null, editando: false };
}

function deletarTodasTarefasConcluidas(estado: EstadoAplicacao): EstadoAplicacao {
	const tarefas = estado.tarefas.filter((t) => !t.concluida);
	return { ...estado, tarefas, tarefaSelecionada: null, editando: false };
}

function editarTarefa(estado: EstadoAplicacao, tarefa: Tarefa): EstadoAplicacao {
	return { ...estado, editando: !estado.editando, tarefaSelecionada: tarefa };
}

function selecionarTarefa(estado: EstadoAplicacao, tarefa: Tarefa): EstadoAplicacao {
	return {
		...estado,
		tarefaSelecionada: tarefa === estado.tarefaSelecionada ? null : tarefa,
	};
}

function atualizarUI() {
	const elementoListaDeTarefas = document.querySelector(elementos.listaDeTarefas);
	const elementoBotaoDeAdicionarTarefa = document.querySelector(elementos.botaoDeAdicionarTarefa) as HTMLButtonElement;
	const elementoFormularioDeAdicaoDeTarefa = document.querySelector(elementos.formularioDeAdicaoDeTarefa) as HTMLFormElement;
	const elementoAreaDeTexto = document.querySelector(elementos.areaDeTexto) as HTMLTextAreaElement;
	const elementoBotaoCancelar = document.querySelector(elementos.botaoCancelar) as HTMLButtonElement;
	const elementoBotaoDeletar = document.querySelector(elementos.botaoDeletar) as HTMLButtonElement;
	const elementoBotaoRemoverTasksConcluidas = document.querySelector(elementos.botaoRemoverTasksConcluidas) as HTMLButtonElement;
	const elementoBotaoRemoverTodasTasks = document.querySelector(elementos.botaoRemoverTodasTasks) as HTMLButtonElement;

	labelTarefaAtiva!.textContent = estadoInicial.tarefaSelecionada ? estadoInicial.tarefaSelecionada.descricao : null;

	if (estadoInicial.editando && estadoInicial.tarefaSelecionada) {
		elementoFormularioDeAdicaoDeTarefa!.classList.remove('hidden');
		elementoAreaDeTexto!.value = estadoInicial.tarefaSelecionada.descricao;
	} else {
		elementoFormularioDeAdicaoDeTarefa!.classList.add('hidden');
		elementoAreaDeTexto!.value = '';
	}

	if (!elementoBotaoDeAdicionarTarefa) {
		throw new Error('"Caro colega, o elemento elementoBotaoDeAdicionarTarefa não foi encontrado. Favor rever."');
	}

	elementoBotaoDeAdicionarTarefa.addEventListener('click', () => {
		elementoFormularioDeAdicaoDeTarefa?.classList.toggle('hidden');
	});

	elementoFormularioDeAdicaoDeTarefa!.addEventListener('submit', (evento) => {
		evento.preventDefault();
		const descricao = elementoAreaDeTexto.value;
		estadoInicial = adicionarTarefa(estadoInicial, {
			descricao,
			concluida: false,
		});

		atualizarUI();
		elementoAreaDeTexto.value = '';
	});

	elementoBotaoCancelar.addEventListener('click', () => {
		elementoFormularioDeAdicaoDeTarefa!.classList.add('hidden');
	});

	elementoBotaoDeletar.addEventListener('click', () => {
		estadoInicial = deletarTarefa(estadoInicial);
		elementoFormularioDeAdicaoDeTarefa!.classList.add('hidden');
		atualizarUI();
	});

	elementoBotaoRemoverTasksConcluidas.addEventListener('click', () => {
		estadoInicial = deletarTodasTarefasConcluidas(estadoInicial);
		atualizarUI();
	});

	elementoBotaoRemoverTodasTasks.addEventListener('click', () => {
		estadoInicial = deletarTodasTarefas(estadoInicial);
		atualizarUI();
	});

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

		if (tarefa.concluida) {
			botao.setAttribute('disabled', 'true');
			li.classList.add('app__section-task-list-item-complete');
		}

		if (tarefa === estadoInicial.tarefaSelecionada) {
			li.classList.add('app__section-task-list-item-active');
		}

		li.addEventListener('click', () => {
			estadoInicial = selecionarTarefa(estadoInicial, tarefa);
			atualizarUI();
		});

		botao.addEventListener('click', (evento) => {
			evento.stopPropagation();
			estadoInicial = editarTarefa(estadoInicial, tarefa);
			atualizarUI();
		});

		elementoListaDeTarefas?.append(li);
	});
}

document.addEventListener('TarefaFinalizada', () => {
	if (estadoInicial.tarefaSelecionada) {
		estadoInicial.tarefaSelecionada.concluida = true;
		atualizarUI();
	}
});

atualizarUI();
