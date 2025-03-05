import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorearComponent } from './colorear.component';

describe('ColorearComponent', () => {
  let component: ColorearComponent;
  let fixture: ComponentFixture<ColorearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColorearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
