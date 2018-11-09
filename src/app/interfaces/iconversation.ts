import { IPlayer } from "./IPlayer";

export interface IConversation {
    id?: number;
    user_one?:number;
    user_second?:number;
    status?:number;
    withUser?:IPlayer;
}
