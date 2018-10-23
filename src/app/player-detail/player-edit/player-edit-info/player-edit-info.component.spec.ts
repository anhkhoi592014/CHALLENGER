import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerEditInfoComponent } from './player-edit-info.component';

describe('PlayerEditInfoComponent', () => {
  let component: PlayerEditInfoComponent;
  let fixture: ComponentFixture<PlayerEditInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerEditInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
