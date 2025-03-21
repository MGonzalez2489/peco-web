import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedEntryGeneralFormComponent } from './planned-entry-general-form.component';

describe('PlannedEntryGeneralFormComponent', () => {
  let component: PlannedEntryGeneralFormComponent;
  let fixture: ComponentFixture<PlannedEntryGeneralFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannedEntryGeneralFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannedEntryGeneralFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
