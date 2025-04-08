import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCardGraphComponent } from './account-card-graph.component';

describe('AccountCardGraphComponent', () => {
  let component: AccountCardGraphComponent;
  let fixture: ComponentFixture<AccountCardGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCardGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountCardGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
