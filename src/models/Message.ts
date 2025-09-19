import User from "./User";

export default interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp: string;
    user: User;
    message?: string,
    answer?: string,
}