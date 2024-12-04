import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAllLeaveComponent } from './manager-all-leave.component';

describe('ManagerAllLeaveComponent', () => {
  let component: ManagerAllLeaveComponent;
  let fixture: ComponentFixture<ManagerAllLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerAllLeaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerAllLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
