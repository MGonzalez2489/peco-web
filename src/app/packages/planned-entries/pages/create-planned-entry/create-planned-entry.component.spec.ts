import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlannedEntryComponent } from './create-planned-entry.component';

describe('CreatePlannedEntryComponent', () => {
  let component: CreatePlannedEntryComponent;
  let fixture: ComponentFixture<CreatePlannedEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePlannedEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePlannedEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
