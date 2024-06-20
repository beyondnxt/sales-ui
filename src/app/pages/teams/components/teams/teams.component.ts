import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import * as data from './teams-data'
import { TeamsService } from 'src/app/providers/teams/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {
  activeCategory = 'Teams';
  tableHeaders: any = data.tableHeadersForTeams;
  tableValues: any = [];
  constructor(private teamsService:TeamsService){}

  ngOnInit(){
    this.getTeamsData()
  }

  getTeamsData(){

    this.teamsService.getTeamData().subscribe({
      next: (res) => {
        console.log('25-------', res);
        this.tableValues = res.data;
      },
      error: (err) => {
      },
      complete: () => {},
    });
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.activeCategory = tabChangeEvent.tab.textLabel;
    // this.getCategoryData();
  }

  searchBox(event: any){

  }
  createNewTeam(){
    
  }
}
