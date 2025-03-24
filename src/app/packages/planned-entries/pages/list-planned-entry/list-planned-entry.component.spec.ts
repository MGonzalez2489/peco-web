import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlannedEntryComponent } from './list-planned-entry.component';

describe('ListPlannedEntryComponent', () => {
  let component: ListPlannedEntryComponent;
  let fixture: ComponentFixture<ListPlannedEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPlannedEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlannedEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
