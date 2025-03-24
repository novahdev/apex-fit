import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzCellphoneComponent } from './nz-cellphone.component';

describe('NzCellphoneComponent', () => {
  let component: NzCellphoneComponent;
  let fixture: ComponentFixture<NzCellphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NzCellphoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NzCellphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
