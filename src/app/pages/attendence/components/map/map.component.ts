import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  private map: L.Map | any;
  private centroid: L.LatLngExpression = [8.186480, 77.430923]; //

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    const icon = L.icon({
      iconUrl: 'assets/images/placeholder.png', // Path to your custom marker icon
      iconSize: [20, 20], // Size of the icon
      // iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
      // popupAnchor: [0, -41] // Point from which the popup should open relative to the iconAnchor
    });


    const coordinates = [
      { lat: "8.188315", lng: "77.400481" },
      { lat: "8.154365", lng: "77.428423" },
      { lat: "8.174416", lng: "77.425331" },
      { lat: "8.173736", lng: "77.468275" }
    ];

    coordinates.forEach(coord => {
      const marker = L.marker([parseFloat(coord.lat), parseFloat(coord.lng)], { icon: icon }).addTo(this.map);
    });
    
    tiles.addTo(this.map);
  
  }

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }
}
