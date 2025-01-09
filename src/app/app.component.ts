import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator/calculator.component';
import { MmboltcalculatorComponent } from './mmboltcalculator/mmboltcalculator.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,CalculatorComponent,MmboltcalculatorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], 
})

export class AppComponent {
  title = 'area-calculator';

  mmBolt : boolean = false;
  inchBolt: boolean = false;
  mmboltbutton= 'not-active';
  inchboltbutton = 'not-active';


  switchcalculatorMMBOLT() {
    this.mmBolt = true;
  this.inchBolt = false;
    this.setmmButtonActive();

  }

  switchcalculatorINCHBOLT() {
    this.inchBolt = true;
    this.mmBolt = false;
    this.setinchButtonActive();
  }


 setmmButtonActive = () =>{
  this.mmboltbutton = 'active';
  this.inchboltbutton = 'not-active';
 }

  setinchButtonActive = () => {
    this.inchboltbutton = 'active';
    this.mmboltbutton = 'not-active';
  }
}
