import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AedlistPage } from './aedlist';

@NgModule({
  declarations: [
    AedlistPage,
  ],
  imports: [
    IonicPageModule.forChild(AedlistPage),
  ],
})
export class AedlistPageModule {}
