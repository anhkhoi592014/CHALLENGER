export interface IPlayer {
    id?: number;
    UserCode?: String;
    UserName?: String;
    password?: String;
    Fullname?: String;
    DateOfBirth?: string;
    Email?:string;
    Sex?: number;
    Weight?: String;
    Height?: String;
    TotalMatches?:number;
    PhoneNumber? : String;
    City?: String;
    Ward?: String;
    Description?: String;
    ImgUrl?: string;
    MainPosition?: String;
    ExtraPosition?: String;
    DateCreated?: String;
    Status?: number;
    IsFriend?: boolean;
    TeamRole?: string;
    Invited?: boolean;
}
