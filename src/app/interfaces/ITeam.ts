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
    City?: String;
    Description?: String;
    Status?: boolean;
    latitude?: number;
    longitude? : number;
    created_at?: Date;
    update_at?: Date;
}
