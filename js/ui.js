class UI {
  constructor() {
    this.api = new api();
    this.markers = new L.layerGroup();
    this.mapa = this.inicializarMapa();
  }

  inicializarMapa() {
    // Inicializar y obtener la propiedad del mapa

    const map = L.map("mapa").setView([19.390519, -99.3739778], 6);

    const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; " + enlaceMapa + " Contributors",
      maxZoom: 18,
    }).addTo(map);

    return map;
  }
  mostrarEstablecimiento() {
    this.api.obtenerDatos().then((datos) => {
      const resultado = datos.respuestaJson.results;
      this.mostrarPines(resultado);
    });
  }

  mostrarPines(datos) {
    this.markers.clearLayers();
    datos.forEach((element) => {
      const { latitude, longitude, calle, regular, premium } = element;

      const opcionesPopUp = L.popup().setContent(`<p>Calle: ${calle}
<p><b>Regular: $ </b> ${regular}</p>
<p><b>Premium: $</b> ${premium}</p>
`);

      const marker = new L.marker([
        parseFloat(latitude),
        parseFloat(longitude),
      ]).bindPopup(opcionesPopUp);

      this.markers.addLayer(marker);
    });
    this.markers.addTo(this.mapa);
  }

  obtenerSugerencias(busquedad){
       this.api.obtenerDatos().then(datos=>{
          const resultado=datos.respuestaJson.results
          
     this.filtrarSugerencias(resultado,busquedad)     
       })
  }
filtrarSugerencias(resultado,busquedad){
    
const filtro = resultado.filter(filtro => filtro.calle.indexOf(busquedad) !==-1
 
)
this.mostrarPines(filtro) 
}

}
