import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryFilterDateComponent } from './entry-filter-date.component';

describe('EntryFilterDateComponent', () => {
  let component: EntryFilterDateComponent;
  let fixture: ComponentFixture<EntryFilterDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryFilterDateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryFilterDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
