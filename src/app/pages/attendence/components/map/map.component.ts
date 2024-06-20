import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { AttendanceService } from 'src/app/providers/attendance/attendance.service';

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
  @Input() SELECTED_USER_ID: any;
  // *--------------------------Global Variable Declaration -------------------------//
  totalWayPoints: any[] = [];
  map!: L.Map;
  markers: L.Marker[] = [];
  // Leaflet Map Marker Icons
  startLocationIcon = 'assets/icons/start-location-marker.png';
  endLocationIcon = 'assets/icons/end-location-marker.png';
  taskActivityLocationIcon = 'assets/icons/activity-location-marker.png';
  emptyLogLocationIcon = 'assets/icons/emptylog-location-marker.png';

  // *--------------------------------Constructor------------------------------------//
  constructor(
    private _attendanceApiService: AttendanceService,
    private router: Router
  ) { }

  // *-----------------------------Life Cycle Hooks----------------------------------//
  ngOnInit(): void {
    this.loadMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.SELECTED_USER_ID != undefined) {
      this.getUserMapData();
    } else {
      this.router.navigate(['/attendence']);
    }
  }

  // *------------------------------Common Methods----------------------------------//
  loadMap() {
    this.map = L.map('map', {}).setView([8.18648, 77.430923], 12);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 1,
      maxZoom: 18,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      opacity: 0.7,
    }).addTo(this.map);
  }

  checkLocationInformation(data: any) {
    // console.log('72----', data);
    
    if (data.attendance?.length > 0) {
      // console.log('attendance-----', data.attendance);
      this.plotAttendanceMarker(data.attendance);
    }
    if (data.task?.length > 0) {
      // console.log('task-----', data.task);
      this.plotTaskMarker(data.task);
    }

    if (data.mapLog?.length > 0) {
      console.log('mapLog-----', data.mapLog);
      this.plotEmptyLogMarker(data.mapLog[0]);
    }
  }

  plotAttendanceMarker(attendance: any) {
    console.log('90------', attendance[0].punchIn);
    if (attendance[0].punchIn != null) {
      console.log('92------');
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
        .bindTooltip('Punch In')
        .openTooltip();
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
        .bindTooltip('Punch Out')
        .openTooltip();
    }
  }

  plotTaskMarker(task: any) {
    task.forEach((element: any) => {
      if (element.location.latitude && element.location.longitude != null) {
        const taskMarker = L.marker(
          [element.location.latitude, element.location.longitude],
          {
            icon: L.icon({
              iconSize: [25, 27],
              iconUrl: this.taskActivityLocationIcon,
            }),
          }
        )
          .addTo(this.map)
          .bindTooltip(
            `
        <html><body>
        <span>Customer:</span><span style="font-weight:bold">${element.customerName}</span><br>
        <span>Task type:</span><span style="font-weight:bold">${element.taskType}</span>
        </body></html>`
          )
          .openTooltip();
      }
    });
  }

  plotEmptyLogMarker(data: any) {
    let emptyLog = data.location;
    console.log('emptyLog-----', emptyLog);
    emptyLog.forEach((element: any) => {
      console.log('152------', element);
      const emptyLogMarker = L.marker([element.latitude, element.longitude], {
        icon: L.icon({
          iconSize: [25, 27],
          iconUrl: this.emptyLogLocationIcon,
        }),
      })
        .addTo(this.map)
        .bindTooltip(
          `
      <html><body>
      <span>User:</span><span style="font-weight:bold">${data.userName}</span><br>
      <span>Date:</span><span style="font-weight:bold">${element.createdOn}</span>
      </body></html>`
        )
        .openTooltip();
    });
  }

  createRouteLine(data: any) {
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

  getWayPoints(data: any) {
    if (data.task.length > 0) {
      for (let i = 0; i < data.task.length; i++) {
        let task = data.task[i].location;
        if (task.latitude && task.longitude != null) {
          task.createdOn = data.task[i].createdOn;
          this.totalWayPoints.push(task);
        }
      }
    }

    if (data.mapLog.length > 0) {
      for (let i = 0; i < data.mapLog.location.length; i++) {
        this.totalWayPoints.push(data.mapLog.location[i]);
      }
    }

    if (data.attendance.length > 0) {
      if (data.attendance[0].punchIn != null) {
        this.totalWayPoints.unshift(data.attendance[0].punchIn);
      }

      if (data.attendance[0].punchOut != null) {
        this.totalWayPoints.push(data.attendance[0].punchOut);
      }
    }
    return this.totalWayPoints;
  }
  // *------------------------------API Methods----------------------------------//
  getUserMapData() {
    this._attendanceApiService
      .getUserMapDetails(this.SELECTED_USER_ID)
      .subscribe({
        next: (res) => {
          console.log('215--------', res);
          this.checkLocationInformation(res.data);
          this.createRouteLine(this.getWayPoints(res.data));
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
