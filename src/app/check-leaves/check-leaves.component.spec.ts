import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckLeavesComponent } from './check-leaves.component';

describe('CheckLeavesComponent', () => {
  let component: CheckLeavesComponent;
  let fixture: ComponentFixture<CheckLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckLeavesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
