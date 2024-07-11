 
 const elementos = {
    html: 'html',
    timer: '#timer',
    banner: '.app__image',
    titulo: '.app__title',
    botoesDeAcao: '.app__card-button',
    startPauseTemporizador: '#start-pause',
    alternarMusica: '#alternar-musica',
 }

 const html = document.querySelector(`${elementos.html}`);
 const timer = document.querySelector(`${elementos.timer}`);
 const banner = document.querySelector(`${elementos.banner}`);
 const titulo = document.querySelector(`${elementos.titulo}`);
 const botoesDeAcao = document.querySelectorAll(`${elementos.botoesDeAcao}`);
 const startPauseTemporizador = document.querySelector(`${elementos.startPauseTemporizador}`);
 const alternarMusica = document.querySelector(`${elementos.alternarMusica}`);
 const musica = new Audio('/sons/luna-rise-part-one.mp3');
 const playAudio = new Audio('/sons/play.wav');
 const pauseAudio = new Audio('/sons/pause.mp3');
 const finalizaTarefaAudio = new Audio('/sons/beep.mp3');
 const duracaoDoFoco = 1500;
 const duracaoDoDescansoCurto = 300;
 const duracaoDoDescansoLongo = 900;

 let tempoDecorridoEmSegundos = 5;
 let intervaloDoTemporizador = null;

 botoesDeAcao.forEach(botao => {
    botao.addEventListener('click', function () {
        const contexto = botao.dataset.contexto;
        alteraContexto(contexto);
        alteraFocoDoBotao(botao);
    });
 });

 function alteraContexto(contexto) {
    html.setAttribute('data-contexto', contexto);
    banner.src = `/imagens/${contexto}.png`;
    alteraTextoDoTitulo(contexto);
 }

 function alteraTextoDoTitulo(contexto) {
    switch(contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'short':
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case 'long':
            titulo.innerHTML = 'Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>';
            break;
            default:
                break;
    }
 }

 function alteraFocoDoBotao(botao) {
    const botaoSetado = document.getElementsByClassName('active');
    botaoSetado[0].classList.remove('active');
    botao.classList.add('active');
 }


 alternarMusica.addEventListener('change', () => {
    tocaMusica();
 });

 function tocaMusica() {
    musica.loop = true;
    musica.paused ? musica.play() : musica.pause();
 }


 startPauseTemporizador.addEventListener('click', () => {
   iniciarTemporizador();
 })

 const contagemRegressiva = () => {
   if(tempoDecorridoEmSegundos <= 0) {
      zeraTemporizador();
      alert('Acabou o tempo!');
      tempoDecorridoEmSegundos = 5;
     return;
   }

   tempoDecorridoEmSegundos -= 1;
   console.log(`Tempo decorrido: ${tempoDecorridoEmSegundos} segundos`);
 }

 function iniciarTemporizador() {
   iniciaOuPausaTemporizador();
 }

 function zeraTemporizador() {
    clearInterval(intervaloDoTemporizador);
    intervaloDoTemporizador = null;
 }

 function iniciaOuPausaTemporizador() {
   if(intervaloDoTemporizador) {
      zeraTemporizador();
      return;
   }
   intervaloDoTemporizador = setInterval(() => {
      contagemRegressiva();
  }, 1000);
 }
