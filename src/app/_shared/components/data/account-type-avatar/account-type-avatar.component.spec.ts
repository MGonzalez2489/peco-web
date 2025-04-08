import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTypeAvatarComponent } from './account-type-avatar.component';

describe('AccountTypeAvatarComponent', () => {
  let component: AccountTypeAvatarComponent;
  let fixture: ComponentFixture<AccountTypeAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountTypeAvatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountTypeAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
