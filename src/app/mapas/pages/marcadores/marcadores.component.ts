import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'

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
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapamarcadores') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [ -104.67026735003768 , 24.024761597415583 ]

  marcadores: mapboxgl.Marker[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://style/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // const maker = new mapboxgl.Marker().setLngLat(this.center).addTo(this.mapa)
  }

  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    }).setLngLat( this.center ).addTo( this.mapa );

    this.marcadores.push( nuevoMarcador )
  }

  irMarcador(){

  }
}
