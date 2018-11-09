export interface IMessage {
    id?: number;
    from_user_id: number;
    to_user_id: number;
    conversation_id: number;
    message: string;
}
