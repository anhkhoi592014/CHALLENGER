export interface IMessage {
    id?: number;
    from_user_id: string;
    to_user_id: string;
    conversation_id: number;
    message: string;
    isReceived?: boolean;
    isURLString?: boolean;
}
