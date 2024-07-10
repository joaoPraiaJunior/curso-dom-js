 
 const elementos = {
    html: 'html',
    botoesDeAcao: '[data-contexto]',
 }

 const html = document.querySelector(`${elementos.html}`);
 const botoesDeAcao = document.querySelectorAll(`${elementos.botoesDeAcao}`);

 console.log(botoesDeAcao);