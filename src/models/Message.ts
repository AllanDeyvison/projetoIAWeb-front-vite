import User from "./User";

export default interface Message {
    message: string,
    answer?: string,
    user: User
}