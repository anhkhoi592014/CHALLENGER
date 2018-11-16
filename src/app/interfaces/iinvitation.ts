import { IPlayer } from "./IPlayer";
import { IMessage } from "./imessage";

export interface IInvitation {
    id?: number;
    team_id?:number;
    user_id?:number;
    status?:number;
    user: IPlayer;
}
