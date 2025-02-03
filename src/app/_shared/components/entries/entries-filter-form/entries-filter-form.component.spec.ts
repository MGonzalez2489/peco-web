import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesFilterFormComponent } from './entries-filter-form.component';

describe('EntriesFilterFormComponent', () => {
  let component: EntriesFilterFormComponent;
  let fixture: ComponentFixture<EntriesFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntriesFilterFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntriesFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
