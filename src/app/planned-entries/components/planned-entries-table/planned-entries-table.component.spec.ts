import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedEntriesTableComponent } from './planned-entries-table.component';

describe('PlannedEntriesTableComponent', () => {
  let component: PlannedEntriesTableComponent;
  let fixture: ComponentFixture<PlannedEntriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannedEntriesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannedEntriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
