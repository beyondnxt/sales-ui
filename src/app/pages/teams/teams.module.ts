import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './components/teams/teams.component';
import { SharedModule } from 'src/app/shared/modules/modules/shared.module';
import { AddTeamsComponent } from './components/add-teams/add-teams.component';


@NgModule({
  declarations: [
    TeamsComponent,
    AddTeamsComponent
  ],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    SharedModule
  ]
})
export class TeamsModule { }
