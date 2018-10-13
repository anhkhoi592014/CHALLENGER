import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamHistoryMatchComponent } from './team-history-match.component';

describe('TeamHistoryMatchComponent', () => {
  let component: TeamHistoryMatchComponent;
  let fixture: ComponentFixture<TeamHistoryMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamHistoryMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamHistoryMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
