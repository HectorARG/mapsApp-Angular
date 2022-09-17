import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'

// import {MenuItem, PrimeIcons} from 'primeng/api';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number,number]
}
@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container{
      height:100%;
      width:100%;
    }
    .list-group{
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }

    li{
      cursor: pointer;
    }
    .eliminar{
      background-color: transparent;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapamarcadores') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [ -104.67026735003768 , 24.024761597415583 ]

  marcadores: MarcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://style/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // const maker = new mapboxgl.Marker().setLngLat(this.center).addTo(this.mapa)

    this.leerLocalStorage()
  }

  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    }).setLngLat( this.center ).addTo( this.mapa );

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });

    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on('dragend', () =>{
      this.guardarMarcadoresLocalStorage();
    });
  }

  irMarcador(lngLat: mapboxgl.Marker){
    const center = lngLat.getLngLat()
    this.mapa.flyTo({center})
  }

  guardarMarcadoresLocalStorage(){
    const lngLatArr: MarcadorColor[] = []

    this.marcadores.forEach(m => {
      const color = m.color;
      const {lng,lat}= m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [ lng, lat ]
      });
    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr))
  }

  leerLocalStorage(){
    if (!localStorage.getItem('marcadores')) {
      return;
    }

    const lngLat: MarcadorColor[]= JSON.parse(localStorage.getItem('marcadores')!);

    lngLat.forEach( m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      }).setLngLat(m.centro!).addTo(this.mapa);

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

      newMarker.on('dragend', () =>{
        this.guardarMarcadoresLocalStorage();
      });

    });

  }

  borrarMarcador(borrar: number){
    this.marcadores[borrar].marker?.remove();
    this.marcadores.splice(borrar, 1);
    this.guardarMarcadoresLocalStorage();
  }
}
