import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerEditPowerComponent } from './player-edit-power.component';

describe('PlayerEditPowerComponent', () => {
  let component: PlayerEditPowerComponent;
  let fixture: ComponentFixture<PlayerEditPowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerEditPowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerEditPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
