 
 const elementos = {
    html: 'html',
    botoesDeAcao: '.app__card-button',
 }

 const html = document.querySelector(`${elementos.html}`);
 const botoesDeAcao = document.querySelectorAll(`${elementos.botoesDeAcao}`);

 console.log(botoesDeAcao.dataset.contexto);