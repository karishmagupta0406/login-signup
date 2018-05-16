import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmergencyContactPage } from './emergency-contact';

@NgModule({
  declarations: [
    EmergencyContactPage,
  ],
  imports: [
    IonicPageModule.forChild(EmergencyContactPage),
  ],
})
export class EmergencyContactPageModule {}
