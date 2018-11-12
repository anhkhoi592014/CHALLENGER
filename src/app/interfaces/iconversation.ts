import { IPlayer } from "./IPlayer";
import { IMessage } from "./imessage";

export interface IConversation {
    id?: number;
    user_one?:number;
    user_second?:number;
    status?:number;
    withUser?:IPlayer;
    listMessage?: IMessage[];
    lastMessage?: string;
}
