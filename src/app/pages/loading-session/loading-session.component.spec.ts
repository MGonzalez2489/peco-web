import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSessionComponent } from './loading-session.component';

describe('LoadingSessionComponent', () => {
  let component: LoadingSessionComponent;
  let fixture: ComponentFixture<LoadingSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
