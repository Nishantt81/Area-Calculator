import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MmboltcalculatorComponent } from './mmboltcalculator.component';

describe('MmboltcalculatorComponent', () => {
  let component: MmboltcalculatorComponent;
  let fixture: ComponentFixture<MmboltcalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MmboltcalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MmboltcalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
