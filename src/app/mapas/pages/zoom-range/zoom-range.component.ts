import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container{
      height:100%;
      width:100%;
    }

    .row{
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
      width: 400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('mapazoom') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;

  constructor() {  }
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://style/mapbox/streets-v11',
      center: [ -104.67026735003768 , 24.024761597415583 ],
      zoom: this.zoomLevel
    });

    this.mapa.on('zoom', () => {
      const zoomActual = this.mapa.getZoom();
      this.zoomLevel = zoomActual;
    });

    this.mapa.on('zoomend', () => {
      if( this.mapa.getZoom() > 18){
        this.mapa.zoomTo( 18 );
      }
    })
  }

  zoomOut(){
    this.mapa.zoomOut();
  }

  zoomIn(){
    this.mapa.zoomIn();
  }

  zoomCambio(zoom: string){
    this.mapa.zoomTo( Number(zoom) )
  }

}
