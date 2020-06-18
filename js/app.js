const ui = new UI();

document.addEventListener('DOMContentLoaded',()=>{ui.mostrarEstablecimiento()})


const buscador = document.querySelector('#buscar input')

buscador.addEventListener('input',()=>{
    const letras= buscador.value.length
    if(letras>5){

     ui.obtenerSugerencias(buscador.value)
    }else{
         ui.mostrarEstablecimiento()
    }
})