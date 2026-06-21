import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalComponent } from './total-component';

describe('TotalComponent', () => {
  let component: TotalComponent;
  let fixture: ComponentFixture<TotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TotalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
