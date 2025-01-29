import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEntryCategoryComponent } from './select-entry-category.component';

describe('SelectEntryCategoryComponent', () => {
  let component: SelectEntryCategoryComponent;
  let fixture: ComponentFixture<SelectEntryCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectEntryCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectEntryCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
