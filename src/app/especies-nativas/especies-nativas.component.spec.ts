import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspeciesNativasComponent } from './especies-nativas.component';

describe('EspeciesNativasComponent', () => {
  let component: EspeciesNativasComponent;
  let fixture: ComponentFixture<EspeciesNativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspeciesNativasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EspeciesNativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
