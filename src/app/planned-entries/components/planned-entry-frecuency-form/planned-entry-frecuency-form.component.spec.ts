import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedEntryFrecuencyFormComponent } from './planned-entry-frecuency-form.component';

describe('PlannedEntryFrecuencyFormComponent', () => {
  let component: PlannedEntryFrecuencyFormComponent;
  let fixture: ComponentFixture<PlannedEntryFrecuencyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannedEntryFrecuencyFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannedEntryFrecuencyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
