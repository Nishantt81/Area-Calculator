import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NutBoltData } from './nutbolt-data'; // Ensure the correct import path


@Component({
  selector: 'app-calculator',
  imports: [FormsModule, CommonModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
  lengthMm: number = 0;
  lengthInch: number = 0;
  currentValue: number= 0;
  selectedUnit : String = '';
  selectedNB: string = '';
  nutBoltData = NutBoltData;
  result: { 
          k: number;
          studArea: number; 
          studPlusNut1Area: number; 
          studPlusNut2Area: number; 
          boltHeadArea: number; 
          boltArea: number; 
          boltPlus1NutArea: number; 
          allenBoltArea: number; 
          eyeBoltArea: number; 
          washerArea: number; 
          boltPlus1NutPlus2Washer: number; 
          boltPlus2NutPlus2Washer: number; 
          studPlus3NutArea: number; 
          weightStud: number; 
          weightBolt:number; 
          weightnutkg:number;
          studplus2nutwt:number;
          studplus3nutwt:number; 
        studplus3nutarea: number;} | null = null;



  updateLength(){

    if(this.selectedUnit == 'Inch'){
      this.lengthInch = this.currentValue;
      this.lengthMm = 0;
    }else if (this.selectedUnit == 'Mm'){
      this.lengthMm = this.currentValue;
      this.lengthInch =0;
    }
  } 

calculate() {
  const selectedNutBolt = this.nutBoltData.find((item) => item.NB === this.selectedNB);
  if (!selectedNutBolt) {
    alert('Invalid NB selected');
    return;
  }

  // Extract required data
  const diameterInch = selectedNutBolt["NB inch"]; // C4 in your formula
  const nutArea = selectedNutBolt["NUT area"]; // Nut area
  const diameterMm = selectedNutBolt["mm"]; // D in formula
  const lengthMm = this.lengthMm > 0 ? this.lengthMm : 0; // L4 in formula
  const lengthInch = this.lengthInch > 0 ? this.lengthInch : 0;
  const mm2 = selectedNutBolt["mm_2"]; // F in formula
  const mm3 = selectedNutBolt["mm_3"]; // H in formula
  const AC = selectedNutBolt["AC"]; // E in fromula
  const THK = selectedNutBolt["THK"]; // G in formula
  const OD = selectedNutBolt["OD"]; // X in formula
  const ID = selectedNutBolt["ID"]; // Y in formula
  const THK_25  = selectedNutBolt["THK_25"]; // Z in formula

/*
  console.log(diameterInch, 'Diameter (inches)');
  console.log(nutArea.toFixed(2), 'Nut Area'); // Rounded
  console.log(diameterMm.toFixed(2), 'Diameter (mm)'); // Rounded
  console.log(lengthMm.toFixed(2), 'Length (mm)'); // Rounded
  console.log(lengthInch.toFixed(2), 'Length (inches)'); // Rounded
  console.log(mm2.toFixed(2), 'mm_2'); // Rounded
  console.log(mm3.toFixed(2), 'mm_3'); // Rounded
  console.log(AC.toFixed(2), '_AC'); 
  console.log(THK.toFixed(2), '_THK'); 
  console.log(OD.toFixed(2), '_OD');
  console.log(ID.toFixed(2), '_ID');
  console.log(THK_25.toFixed(2), '_THK_25');
*/

  // Calculate K value using the corrected formula
  let K = ((((2 * 3.14 * (diameterMm / 2) * lengthMm) + (((diameterMm / 2) * (diameterMm / 2) * 3.14) * 2))) / 25.4) / 25.4;

  
  let studArea;

  if (lengthInch>0) {
    studArea = (2 * 3.14 * (diameterInch / 2) * lengthInch) + (((diameterInch / 2) * (diameterInch / 2) * 3.14) * 2);
  } else {
    studArea = K
  }


  


  // Calculate Stud + 1 Nut Area
  const studPlusNut1Area = studArea + nutArea;

  // Calculate Stud + 2 Nut Area
  const studPlusNut2Area = studArea + nutArea * 2;





  // Calculate Bolt Head Area
  const boltHeadArea = (2 * 3.14 * (AC / 2) * THK) + (2 * (3.14 * (AC / 2) * (AC / 2)));


  // Calculate Bolt Area (Q4 = M4 + P4)
  const boltArea = studArea + boltHeadArea;


  // Calculate Bolt + 1 Nut Area (Q4 + I4)
  const boltPlus1NutArea = boltArea + nutArea;


  // Calculate Allen Bolt Area (Q4 + (Q4 * 0.1))
  const allenBoltArea = boltArea + (boltArea * 0.1);



  // Calculate Eye Bolt Area (Q4 + (Q4 * 0.15))
  const eyeBoltArea = boltArea + (boltArea * 0.15);




  // Washer Area Calculation 
  const washerArea = (((3.14 * Math.pow(OD / 2, 2)) - (3.14 * Math.pow(ID / 2, 2))) * 2) +
    (2 * 3.14 * (OD / 2) * THK_25) +
    (2 * 3.14 * (ID / 2) * THK_25);


  //boltPlus1NutPlus2Washer
  const boltPlus1NutPlus2Washer = boltArea + nutArea + washerArea + washerArea

  //boltPlus2NutPlus2Washer calculation
  const boltPlus2NutPlus2Washer = studPlusNut2Area + washerArea+ washerArea

  //studPlus3NutArea calculation
  const studPlus3NutArea = studArea + 3*nutArea

  //calculateweightnutkg
  const weightnutkg = ((0.785 * (mm2*mm2)*mm3)-(0.785*(diameterMm*diameterMm)*mm3))*0.0000075

  // Calculate Weight Stud (kg)
  const weightStud = ((0.785 * (diameterMm * diameterMm) * lengthMm) * 0.0000075);



  // Calculate Weight Bolt (kg)
  const weightBolt = ((0.785 * (mm2 * mm2) * mm3) * 0.0000075) + weightStud;



  //calculate stud + 2 nut wght
  const studplus2nutwt = weightStud + weightnutkg + weightnutkg



  // calculate stud + 3 nut area
  const studplus3nutarea = studPlusNut2Area + nutArea



  //calculate stud + 3 nut wght
  const studplus3nutwt = weightStud + (3 * weightnutkg)


  // Update the result
  type ResultType = {
    k :number;
    studArea: number;
    studPlusNut1Area: number;
    studPlusNut2Area: number;
    weightStud: number;
    weightnutkg: number;
    weightBolt: number;
    boltHeadArea: number;
    boltArea:number,
    boltPlus1NutArea:number,
    allenBoltArea:number,
    eyeBoltArea:number,
    washerArea:number,
    boltPlus1NutPlus2Washer:number,
    boltPlus2NutPlus2Washer: number,
    studPlus3NutArea:number,
    studplus2nutwt:number,
    studplus3nutwt:number,
    studplus3nutarea:number,
  };

  this.result = {
    k : parseFloat(K.toFixed(2)),
    studArea: parseFloat(studArea.toFixed(2)),
    studPlusNut1Area: parseFloat(studPlusNut1Area.toFixed(2)),
    studPlusNut2Area: parseFloat(studPlusNut2Area.toFixed(2)),
    weightStud: parseFloat(weightStud.toFixed(3)),
    weightnutkg: parseFloat(weightnutkg.toFixed(3)),
    weightBolt: parseFloat(weightBolt.toFixed(2)),
    boltHeadArea: parseFloat(boltHeadArea.toFixed(2)),
    boltArea: parseFloat (boltArea.toFixed(2)),
    boltPlus1NutArea: parseFloat(boltPlus1NutArea.toFixed(2)),
    allenBoltArea: parseFloat(allenBoltArea.toFixed(2)),
    eyeBoltArea: parseFloat(eyeBoltArea.toFixed(2)),
    washerArea: parseFloat(washerArea.toFixed(2)),
    boltPlus1NutPlus2Washer: parseFloat(boltPlus1NutPlus2Washer.toFixed(2)), 
    boltPlus2NutPlus2Washer: parseFloat(boltPlus2NutPlus2Washer.toFixed(2)),
    studPlus3NutArea: parseFloat(studPlus3NutArea.toFixed(2)),
    studplus2nutwt: parseFloat(studplus2nutwt.toFixed(3)),
    studplus3nutwt: parseFloat(studplus3nutwt.toFixed(2)),
    studplus3nutarea: parseFloat(studPlus3NutArea.toFixed(3)),
    
  } as ResultType;


  /*
  this.lengthMm = 0;
  this.lengthInch = 0;
  this.currentValue  = 0;
  this.selectedUnit = '';
  this.selectedNB = '';


  */
}

}