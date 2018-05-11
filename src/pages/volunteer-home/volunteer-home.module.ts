import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VolunteerHomePage } from './volunteer-home';

@NgModule({
  declarations: [
    VolunteerHomePage,
  ],
  imports: [
    IonicPageModule.forChild(VolunteerHomePage),
  ],
})
export class VolunteerHomePageModule {}
