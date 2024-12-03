import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuerposDeAguaComponent } from './cuerpos-de-agua.component';

describe('CuerposDeAguaComponent', () => {
  let component: CuerposDeAguaComponent;
  let fixture: ComponentFixture<CuerposDeAguaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuerposDeAguaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CuerposDeAguaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
