import { Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

declare module 'leaflet' {
  namespace Routing {
    function control(options?: Routing.ControlOptions): Routing.Control;
    // Add any additional types or functions as needed

    interface Control extends L.Control {
      (waypoints: L.LatLng[]): void;
      show(): void; // Add this line
      hide(): void; // Add this line
    }

    interface ControlOptions extends L.ControlOptions {
      waypoints?: L.LatLng[];
    }
  }
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  // *--------------------------Global Variable Declaration -------------------------//
  map!: L.Map;
  markers: L.Marker[] = [];
  // Leaflet Map Marker Icons
  startLocationIcon = 'assets/icons/start-location-marker.png';
  endLocationIcon = 'assets/icons/end-location-marker.png';
  taskActivityLocationIcon = 'assets/icons/activity-location-marker.png';
  emptyLogLocationIcon = 'assets/icons/emptylog-location-marker.png';

  locationData = [
    {
      userId: 2,
      userName: 'jisha',
      mapLog: [
        {
          latitude: '8.182460368948256',
          longitude: '77.40867012528761',
        },
      ],
      attendance: [
        {
          punchIn: {
            latitude: '8.186348778473072',
            longitude: '77.40285789730248',
          },
          punchOut: {
            latitude: '8.181934724493908',
            longitude: '77.40917082982828',
          },
        },
      ],
      task: [
        {
          latitude: '8.184878324506487',
          longitude: '77.40624246690858',
        },
      ],
      createdOn: '2024-05-02T16:49:01.000Z',
    },
  ];

  poly = [
    {
      latitude: '8.186348778473072',
      longitude: '77.40285789730248',
    },
    {
      latitude: '8.184878324506487',
      longitude: '77.40624246690858',
    },
    {
      latitude: '8.182460368948256',
      longitude: '77.40867012528761',
    },
    {
      latitude: '8.181934724493908',
      longitude: '77.40917082982828',
    },
  ];
  // *--------------------------------Constructor------------------------------------//
  constructor() {}

  // *-----------------------------Life Cycle Hooks----------------------------------//
  ngOnInit(): void {
    this.loadMap();
    this.checkLocationInformation(this.locationData);
    this.createPolyLine(this.poly);
  }

  // *------------------------------Common Methods----------------------------------//
  loadMap() {
    this.map = L.map('map', {}).setView([8.18648, 77.430923], 12);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 10,
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      opacity: 0.7,
    }).addTo(this.map);
  }

  checkLocationInformation(data: any) {
    if (data[0].attendance.length > 0) {
      this.plotAttendanceMarker(data[0].attendance);
    }
    if (data[0].task.length > 0) {
      this.plotTaskMarker(data[0].task);
    }

    if (data[0].mapLog.length > 0) {
      this.plotEmptyLogMarker(data[0].mapLog);
    }
  }

  plotAttendanceMarker(attendance: any) {
    if (attendance[0].punchIn != null) {
      const punchInMarker = L.marker(
        [attendance[0].punchIn.latitude, attendance[0].punchIn.longitude],
        {
          icon: L.icon({
            iconSize: [25, 27],
            iconUrl: this.startLocationIcon,
          }),
        }
      )
        .addTo(this.map)
        .bindTooltip('Punch In').openTooltip();
    }

    if (attendance[0].punchOut != null) {
      const punchOutMarker = L.marker(
        [attendance[0].punchOut.latitude, attendance[0].punchOut.longitude],
        {
          icon: L.icon({
            iconSize: [25, 27],
            iconUrl: this.endLocationIcon,
          }),
        }
      )
        .addTo(this.map)
        .bindTooltip('Punch Out').openTooltip();
    }
  }

  plotTaskMarker(task: any) {
    task.forEach((element: any) => {
      const taskMarker = L.marker([element.latitude, element.longitude], {
        icon: L.icon({
          iconSize: [25, 27],
          iconUrl: this.taskActivityLocationIcon,
        }),
      }).addTo(this.map).bindTooltip('<html><body><span>Customer:</span> <span style="font-weight:bold">Dass</span><br><span>Task: Call Back</sp></body></body></html>').openTooltip();
    });
  }

  plotEmptyLogMarker(emptyLog: any) {
    emptyLog.forEach((element: any) => {
      const emptyLogMarker = L.marker([element.latitude, element.longitude], {
        icon: L.icon({
          iconSize: [25, 27],
          iconUrl: this.emptyLogLocationIcon,
        }),
      }).addTo(this.map);
    });
  }

  createPolyLine(data: any) {
    const routingControl = L.Routing.control({
      waypoints: data.map((element: any) => {
        return L.latLng(element.latitude, element.longitude);
      }),
      routeWhileDragging: false,
      createMarker: false,
      lineOptions: {
        styles: [
          { color: '#221ec9', opacity: 0.6, weight: 8, dashArray: '3, 15' },
        ],
        clickable: false,
        draggableWaypoints: false,
        addWaypoints: false,
      },
      show: true,
    } as any).addTo(this.map);
  }
}

