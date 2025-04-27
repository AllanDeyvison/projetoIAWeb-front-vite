import Message from "./Message";
import { UserType } from "./UserType";

export default interface User {
    id: number,
    username: string,
    email: string,
    name: string,
    lastname: string,
    password: string,
    birthday: string,
    picture: string,
    message?: Message | null,
    userType: UserType
}