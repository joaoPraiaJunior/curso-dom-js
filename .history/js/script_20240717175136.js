
(function() {

   'use strict';
   
   const elementos = {
      html: 'html',
      timer: '#timer',
      banner: '.app__image',
      tituloPrincipal: '.app__title',
      botoesDeAcaoDoMenu: '.app__card-button',
      botaoDePlayPause: '#start-pause',
      playerDaMusicaDeFundo: '#alternar-musica',
      iconePlayPause: '.app__card-primary-butto-icon',
   }
   
   const html = document.querySelector(`${elementos.html}`);
   const timer = document.querySelector(`${elementos.timer}`);
   const banner = document.querySelector(`${elementos.banner}`);
   const tituloPrincipal = document.querySelector(`${elementos.tituloPrincipal}`);
   const botoesDeAcaoDoMenu = document.querySelectorAll(`${elementos.botoesDeAcaoDoMenu}`);
   const botaoDePlayPause = document.querySelector(`${elementos.botaoDePlayPause}`);
   const textoDoBotaoPlayPause = botaoDePlayPause.querySelector('span');
   const playerDaMusicaDeFundo = document.querySelector(`${elementos.playerDaMusicaDeFundo}`);
   const iconePlayPause = document.querySelector(`${elementos.iconePlayPause}`);
   const musicaDeFundo = new Audio('./sons/luna-rise-part-one.mp3');
   const audioDePlay = new Audio('./sons/play.wav');
   const audioDePause = new Audio('./sons/pause.mp3');
   const audioDeFinalizacaoDeTarefa = new Audio('./sons/beep.mp3');
   const duracaoDoFoco = 1500;
   const duracaoDoDescansoCurto = 300;
   const duracaoDoDescansoLongo = 900;
   
   let tempoDecorridoEmSegundos = duracaoDoFoco;
   let intervaloDoTemporizador = null;
   
   botoesDeAcaoDoMenu.forEach(botao => {
      botao.addEventListener('click', function () {
         const contexto = botao.dataset.contexto;
         alteraContexto(contexto);
         alteraFocoDoBotao(botao);
      });
   });
   
   function alteraContexto(contexto) {
      html.setAttribute('data-contexto', contexto);
      banner.src = `./imagens/${contexto}.png`;
      alteraTextoDoTituloPrincipal(contexto);
      alteraTempo(contexto);
   }
   
   function alteraTextoDoTituloPrincipal(contexto) {
      switch (contexto) {
         case 'foco':
            tituloPrincipal.innerHTML = `Otimize sua produtividade,<br>
                  <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
         case 'descanso-curto':
            tituloPrincipal.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
         case 'descanso-longo':
            tituloPrincipal.innerHTML = 'Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>';
            break;
      }
   }
   
   function alteraFocoDoBotao(botao) {
      const botaoSetado = document.getElementsByClassName('active');
      botaoSetado[0].classList.remove('active');
      botao.classList.add('active');
   }
   
   playerDaMusicaDeFundo.addEventListener('change', () => {
      tocaMusica();
   });
   
   function tocaMusica() {
      musicaDeFundo.loop = true;
      musicaDeFundo.paused ? musicaDeFundo.play() : musicaDeFundo.pause();
   }
   
   botaoDePlayPause.addEventListener('click', () => {
      iniciaOuPausaTemporizador();
   });
   
   const contagemRegressiva = () => {
      if (tempoDecorridoEmSegundos <= 0) {
         audioDeFinalizacaoDeTarefa.play();
         alert('Acabou o tempo!');
         despachaEventoDeConclusao();
         limpaIntervaloDoTemporizador();
         alteraTempo(html.dataset.contexto);
         return;
      }
   
      tempoDecorridoEmSegundos -= 1;
      mostraTempo();
   }
   
   function limpaIntervaloDoTemporizador() {
      clearInterval(intervaloDoTemporizador);
      textoDoBotaoPlayPause.textContent = 'Começar';
      iconePlayPause.src = './imagens/play_arrow.png';
      botaoDePlayPause.setAttribute('aria-pressed', 'false');
      intervaloDoTemporizador = null;
   }
   
   function iniciaOuPausaTemporizador() {
      if (intervaloDoTemporizador) {
         audioDePause.play();
         limpaIntervaloDoTemporizador();
         return;
      }
      audioDePlay.play();
      intervaloDoTemporizador = setInterval(contagemRegressiva, 1000);
      textoDoBotaoPlayPause.textContent = 'Pausar';
      iconePlayPause.src = './imagens/pause.png';
      botaoDePlayPause.setAttribute('aria-pressed', 'true');
   }
   
   function mostraTempo() {
      const tempo = new Date(tempoDecorridoEmSegundos * 1000);
      const tempoFormatado = tempo.toLocaleTimeString('pt-BR', { minute: '2-digit', second: '2-digit' });
      timer.textContent = `${tempoFormatado}`;
   }
   
   function alteraTempo(contexto) {
      switch (contexto) {
         case 'foco':
            tempoDecorridoEmSegundos = duracaoDoFoco;
            break;
         case 'descanso-curto':
            tempoDecorridoEmSegundos = duracaoDoDescansoCurto;
            break;
         case 'descanso-longo':
            tempoDecorridoEmSegundos = duracaoDoDescansoLongo;
            break;
      }
   
      mostraTempo();
   }

   function despachaEventoDeConclusao() {
      const focoAtivo = html.dataset.contexto === 'foco';
      if(focoAtivo) {
         const evento = new CustomEvent('FocoConcluido');
         document.dispatchEvent(evento);
      } 
   }
   
   mostraTempo();

})();


