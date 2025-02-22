import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionsPageComponent } from './competitions-page.component';

describe('CompetitionsPageComponent', () => {
  let component: CompetitionsPageComponent;
  let fixture: ComponentFixture<CompetitionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompetitionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
