 
 const elementos = {
    html: 'html',
    timer: '#timer',
    banner: '.app__image',
    titulo: '.app__title',
    botaoIniciar: '.app__card-primary-button',
    botoesDeAcao: '.app__card-button',
 }

 const html = document.querySelector(`${elementos.html}`);
 const timer = document.querySelector(`${elementos.timer}`);
 const banner = document.querySelector(`${elementos.banner}`);
 const titulo = document.querySelector(`${elementos.titulo}`);
 const botaoIniciar = document.querySelector(`${elementos.botaoIniciar}`);
 const botoesDeAcao = document.querySelectorAll(`${elementos.botoesDeAcao}`);
 const duracaoDoFoco = 1500;
 const duracaoDoDescansoCurto = 300;
 const duracaoDoDescansoLongo = 900;

 botoesDeAcao.forEach(botao => {
    botao.addEventListener('click', () => {
        const contexto = botao.dataset.contexto;
        console.log(contexto)
    });
 });

 function alterarContexto(contexto) {
    html.setAttribute('data-contexto', contexto);
    banner.src = `/imagens/${contexto}.png`;
 }