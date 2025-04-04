import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesGraphComponent } from './entries-graph.component';

describe('EntriesGraphComponent', () => {
  let component: EntriesGraphComponent;
  let fixture: ComponentFixture<EntriesGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntriesGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntriesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
