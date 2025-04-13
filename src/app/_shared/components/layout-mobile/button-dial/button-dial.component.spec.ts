import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonDialComponent } from './button-dial.component';

describe('ButtonDialComponent', () => {
  let component: ButtonDialComponent;
  let fixture: ComponentFixture<ButtonDialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonDialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonDialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
