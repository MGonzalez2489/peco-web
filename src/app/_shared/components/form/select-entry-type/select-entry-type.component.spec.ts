import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEntryTypeComponent } from './select-entry-type.component';

describe('SelectEntryTypeComponent', () => {
  let component: SelectEntryTypeComponent;
  let fixture: ComponentFixture<SelectEntryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectEntryTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectEntryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
