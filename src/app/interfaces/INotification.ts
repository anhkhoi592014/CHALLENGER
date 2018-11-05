export interface INotification {
    id: number,
    user_id? : number,
    from_id? : number,
    notification_type_id? : number,
    status? : number,
    created_at?: string
}
