import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryCategoryCardComponent } from './entry-category-card.component';

describe('EntryCategoryCardComponent', () => {
  let component: EntryCategoryCardComponent;
  let fixture: ComponentFixture<EntryCategoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryCategoryCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryCategoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
