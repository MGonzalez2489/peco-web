import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntryFormComponent } from './create-entry-form.component';

describe('CreateEntryFormComponent', () => {
  let component: CreateEntryFormComponent;
  let fixture: ComponentFixture<CreateEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEntryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
