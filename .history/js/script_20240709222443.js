 
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

 console.log(botoesDeAcao);