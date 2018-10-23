import { Component, OnInit, Input } from '@angular/core';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { IPower } from 'src/app/interfaces/ipower';
import { ITeam } from 'src/app/interfaces/ITeam';
import { AccountService } from 'src/app/core/services/account.service';
import { SystemConstants } from 'src/app/core/common/system.constants';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.scss']
})
export class PlayerEditComponent implements OnInit {
  @Input() player: IPlayer;
  @Input() listPowers: IPower[];
  @Input() powersData: IPower[];
  @Input() listTeams: ITeam[];
  constructor(
    private accountServices : AccountService
  ) { }

  ngOnInit() {
    this.accountServices.getUserPositions(localStorage.getItem(SystemConstants.CURRENT_USER));
  }

}
