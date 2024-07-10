 
 const elementos = {
    html: 'html',
    botoesDeAcao: '.app__card-button',
    timer: '#timer',
    banner: '.app__image',
    titulo: '.app__title',
 }

 const html = document.querySelector(`${elementos.html}`);
 const botoesDeAcao = document.querySelectorAll(`${elementos.botoesDeAcao}`);
 const timer = document.querySelector(`${elementos.timer}`);
 const banner = document.querySelector(`${elementos.banner}`);
 const titulo = document.querySelector(`${elementos.titulo}`);

 console.log(botoesDeAcao);