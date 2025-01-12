import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryTypeComponent } from './entry-type.component';

describe('EntryTypeComponent', () => {
  let component: EntryTypeComponent;
  let fixture: ComponentFixture<EntryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
