export type RoomQueryResult = {
    id: number, 
    first_user: number, 
    second_user: number,
}

export type MessageQueryResult = {
    id: number, 
    message: number, 
    chat_id: number,
    user_id: number,
    timestamp: Date,
}