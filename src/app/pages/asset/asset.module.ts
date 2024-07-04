import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetRoutingModule } from './asset-routing.module';
import { AssetComponent } from './components/asset/asset.component';
import { SharedModule } from 'src/app/shared/modules/modules/shared.module';


@NgModule({
  declarations: [
    AssetComponent
  ],
  imports: [
    CommonModule,
    AssetRoutingModule,
    SharedModule
  ]
})
export class AssetModule { }
