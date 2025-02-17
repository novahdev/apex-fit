import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthletesPageComponent } from './athletes-page.component';

describe('AthletesPageComponent', () => {
  let component: AthletesPageComponent;
  let fixture: ComponentFixture<AthletesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AthletesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AthletesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
