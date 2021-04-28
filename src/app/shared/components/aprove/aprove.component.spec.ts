import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AproveComponent } from './aprove.component';

describe('AproveComponent', () => {
  let component: AproveComponent;
  let fixture: ComponentFixture<AproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
