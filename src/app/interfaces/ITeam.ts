export interface ITeam {
    id?: number;
    TeamCode?:String;
    Fullname?: String;
    ImgUrl?: String;
    WinRate?: number;
    TotalScore?: number;
    TotalMatch?: number;
    TotalWin?: number;
    Ward?: String;
    CityId?: number;
    Description?: String;
    Status?: boolean;
    created_at?: Date;
    update_at?: Date;
}
