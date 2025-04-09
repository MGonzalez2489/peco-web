import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAvatarComponent } from './category-avatar.component';

describe('CategoryAvatarComponent', () => {
  let component: CategoryAvatarComponent;
  let fixture: ComponentFixture<CategoryAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryAvatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
