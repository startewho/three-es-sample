import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cruve3dComponent } from './cruve3d.component';

describe('Cruve3dComponent', () => {
  let component: Cruve3dComponent;
  let fixture: ComponentFixture<Cruve3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cruve3dComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cruve3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
