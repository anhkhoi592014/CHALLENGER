import { ITeam } from "./ITeam";

export interface IMatch {
    id? : number,
    team_one_id?: number,
    team_second_id?: number,
    team_one_score?: number,
    team_second_score?: number,
    organization_day?: string,
    place?: string,
    match_not?: string,
    created_at?: string,
    updated_at?: string,
    teamOne?: ITeam,
    teamSecond?: ITeam
}
