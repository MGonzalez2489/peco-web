import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedEntriesComponent } from './planned-entries.component';

describe('PlannedEntriesComponent', () => {
  let component: PlannedEntriesComponent;
  let fixture: ComponentFixture<PlannedEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannedEntriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannedEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
