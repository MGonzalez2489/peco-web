import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PESelectEnumComponent } from './p-e-select-enum.component';

describe('PESelectEnumComponent', () => {
  let component: PESelectEnumComponent;
  let fixture: ComponentFixture<PESelectEnumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PESelectEnumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PESelectEnumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
