import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VictimHomePage } from './victim-home';

@NgModule({
  declarations: [
    VictimHomePage,
  ],
  imports: [
    IonicPageModule.forChild(VictimHomePage),
  ],
})
export class VictimHomePageModule {}
