import { IPlayer } from "./IPlayer";
import { IPosition } from "./iposition";

export interface IMember {
    id?: number,
    user_id? : number,
    team_id? : number,
    position_id? : number,
    role_id? : number,
    user?: IPlayer,
    position?: IPosition,
    imgRoleUrl?: string,
    roleName?: string
}
