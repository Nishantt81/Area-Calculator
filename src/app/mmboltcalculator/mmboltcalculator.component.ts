import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { mmboltdata } from './mmbolt-data';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-mmboltcalculator',
  imports: [FormsModule,CommonModule, RouterOutlet],
  templateUrl: './mmboltcalculator.component.html',
  styleUrl: './mmboltcalculator.component.css'
})
export class MmboltcalculatorComponent {
Lengthpermm: number = 0;
lengthperinch: number = 0;
selectedNB: string = '';
mmBoltData = mmboltdata; 
currentValue: number = 0;
selectedUnit: string = '';
 
result: { 
        k : number;
        studarea: number;
          nutarea:number;
          studplus1nutarea:number;
          studplus2nutarea:number;
          bolthead:number;
          boltarea:number;
          allenboltarea: number;
          areammsq : number;
          washerarea: number;
          boltplus1nut: number;
          boltplus1nutplus2washers: number;
          weightstudkg: number;
          weightnutkg:number;
          weightboltkg: number;
          studplus2nutpluswasher:number;

} | null = null;




  updateLength() {

    if (this.selectedUnit == 'Inch') {
      this.lengthperinch = this.currentValue;
      this.Lengthpermm = 0;
    } else if (this.selectedUnit == 'Mm') {
      this.Lengthpermm = this.currentValue;
      this.lengthperinch =0;
    }
  } 


  calculate() {
    const selectedNutBolt = this.mmBoltData.find((item) => item.NB === this.selectedNB);
    if (!selectedNutBolt) {
      alert('Invalid NB selected');
      return;
    }

   
    // Extract required data
    const nbmm = parseFloat(selectedNutBolt["NB mm"]); // B in your formula
    const AC = selectedNutBolt["AC"]; // C in fromula
    const acperinch = selectedNutBolt["AC/inch"]; // D in formula
    const THK = parseFloat(selectedNutBolt["THK"]); // E in formula
    const THKperinch = selectedNutBolt["THK/INCH"]; // F in formula
    const nutArea = selectedNutBolt["NUT area"]; //  G Nut area
    const lengthMm = this.Lengthpermm > 0 ? this.Lengthpermm : 0; // h in formula
    const lengthInch = this.lengthperinch > 0 ? this.lengthperinch : 0; // I in informula
    const OD = selectedNutBolt["OD"]; // Q in formula
    const ID = selectedNutBolt["ID"]; // R in formula
    const THK_1 = selectedNutBolt["THK_1"]; //  in formula

    /*
    
    console.log(nbmm, 'NB mm');
    console.log(AC.toFixed(2), 'AC');
    console.log(acperinch.toFixed(2), 'AC/inch');
    console.log(THK.toFixed(2), 'THK');
    console.log(THKperinch.toFixed(2), 'THK/inch');
    console.log(nutArea.toFixed(2), 'NUt Area');
    console.log(lengthMm.toFixed(2), 'Length/mm');
    console.log(lengthInch.toFixed(2), 'Length/Inch');
    console.log(OD?.toFixed(2), 'OD');
    console.log(ID?.toFixed(2), 'ID');
    console.log(THK_1?.toFixed(2), 'THK_1');
  
    */
  
  
    let k = (((2*3.14*(THKperinch/2)*lengthInch) + (((THKperinch/2)*(THKperinch/2)*3.14)*2)))



    let nutarea =  (((2 * 3.14 * (AC / 2) * THK) + (2 * 3.14 * THK * (nbmm / 2)) + (((3.14 * (AC / 2) * (AC / 2)) - ((3.14 * (nbmm / 2) * (nbmm / 2)))) * 2)) / 25.4) / 25.4


    let studarea
    
    if(lengthMm>0) {
      studarea = (((2 * 3.14 * (nbmm / 2) * lengthMm) + (((nbmm / 2) * (nbmm / 2) * 3.14) * 2)) / 25.4) / 25.4
    } else {
      studarea = k
    }



    //studplus1nutarea
    const studplus1nutarea = studarea + nutarea;

    //studplus2nutarea
    const studplus2nutarea = studarea + nutarea + nutarea;

    //calculate Bolt head
    const bolthead = ((((2 * 3.14 * (AC / 2) * THK) + (2 * ((3.14 * (AC / 2) * (AC / 2)))))) / 25.4) / 25.4;

    //Calculate bolt area 
    const boltarea = studarea + bolthead;

    // allen bolt area 
    const allenboltarea = boltarea + (boltarea * 0.1);

    // calculate Area mmsq
    const areammsq = ((3.14 * ((OD! / 2) * (OD! / 2))) - (3.14 * ((ID! / 2) * (ID! / 2)))) * 2 + (2 * 3.14 * (OD! / 2) * THK_1!) + (2 * 3.14 * (ID! / 2) * THK_1!)

    //calculate  washer area 
    const washerarea = (areammsq / 25.4) / 25.4

    //calculate bolt + 1 nut
    const boltplus1nut = boltarea + nutArea

    // bolt + 1 nut + 2 washers
    const boltplus1nutplus2washers = boltarea + nutArea + washerarea + washerarea

    //weight stud kg
    const weightstudkg = ((0.785 * (nbmm * nbmm) * lengthMm) * 0.0000075)

    //weight nut kg
    const weightnutkg = (((0.785 * (AC * AC) * nbmm) - (0.785 * (nbmm * nbmm) * nbmm)) * 0.0000075)

    // weight bolt kg 
    const weightboltkg = weightstudkg + ((0.785 * (AC * AC) * nbmm) * 0.0000075)


    //stud + 2 nut + 2 washer
    const studplus2nutpluswasher = studplus2nutarea + washerarea + washerarea

    type ResultType = {
      k: number;
      nutarea:number,
      studarea:number,
      studplus1nutarea:number,
      studplus2nutarea:number,
      bolthead:number,
      boltarea:number,
      allenboltarea:number,
      areammsq: number,
      washerarea:number,
      boltplus1nut: number,
      boltplus1nutplus2washers: number,
      weightstudkg:number,
      weightnutkg: number,
      weightboltkg: number,
      studplus2nutpluswasher: number,
    }

    this.result = {
      k:parseFloat(k.toFixed(2)),
      nutarea:parseFloat(nutarea.toFixed(2)),
      studarea: parseFloat(studarea.toFixed(2)),
      studplus1nutarea: parseFloat(studplus1nutarea.toFixed(2)),
      studplus2nutarea: parseFloat(studplus2nutarea.toFixed(2)),
      bolthead: parseFloat(bolthead.toFixed(2)),
      boltarea: parseFloat(boltarea.toFixed(2)),
      allenboltarea: parseFloat(allenboltarea.toFixed(2)),
      areammsq: parseFloat(areammsq.toFixed(2)),
      washerarea: parseFloat(washerarea.toFixed(2)),
      boltplus1nut: parseFloat(boltplus1nut.toFixed(2)),
      boltplus1nutplus2washers: parseFloat(boltplus1nutplus2washers.toFixed(2)),
      weightstudkg: parseFloat(weightstudkg.toFixed(3)),
      weightnutkg: parseFloat(weightnutkg.toFixed(3)),
      weightboltkg: parseFloat(weightboltkg.toFixed(3)),
      studplus2nutpluswasher: parseFloat(studplus2nutpluswasher.toFixed(2)),
    } as  ResultType;




    /*
        this.currentValue = 0;
    this.lengthperinch = 0;
    this.Lengthpermm =0;
    this.selectedUnit = '';
    this.selectedNB = '';

    */
} 




}
