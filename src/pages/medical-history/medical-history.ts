import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

/**
 * Generated class for the MedicalHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medical-history',
  templateUrl: 'medical-history.html',
})
export class MedicalHistoryPage {
  public diseases=[];
	public medicines=[];

  constructor(public navCtrl: NavController,private alertController:AlertController) {

  }

  addDiseases(){
	let addDiseaseAlert = this.alertController.create({
		title:"Add Disease",
		inputs:[{
			type:"text",
			name:"addDiseasesInput"
		}
		],
		buttons:[{
			text:"Cancel"
		},
		{
			text:"Add Disease",
			handler:(inputData)=>{
				let disease;
				disease=inputData.addDiseasesInput;
				if(disease !== ""){
				this.diseases.push(disease);
				}
			}
		}

		]
	});
	addDiseaseAlert.present();
}

addMedicines(){
	let addMedicineAlert = this.alertController.create({
		title:"Add Medicine",
		inputs:[{
			type:"text",
			name:"addMedicineInput"
		}
		],
		buttons:[{
			text:"Cancel"
		},
		{
			text:"Add Medicine",
			handler:(inputData)=>{
				let medicine;
				medicine=inputData.addMedicineInput;
				if(medicine !== ""){
				this.medicines.push(medicine);
				}
			}
		}

		]
	});
	addMedicineAlert.present();
}


deleteDisease(todoIndex){
	let deleteDisease=this.diseases[todoIndex];
	this.diseases.splice(todoIndex, 1);
}

deleteMedicine(todoIndex){
	let deleteMedicine=this.medicines[todoIndex];
	this.medicines.splice(todoIndex, 1);
}


}
