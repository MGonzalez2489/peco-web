import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryCategoryFormComponent } from './entry-category-form.component';

describe('EntryCategoryFormComponent', () => {
  let component: EntryCategoryFormComponent;
  let fixture: ComponentFixture<EntryCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryCategoryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
