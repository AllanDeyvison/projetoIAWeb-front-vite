import { UserType } from "./UserType"

export default interface UserLogin {
    id: number,
    username: string,
    password: string,
    token: string,
    name: string,
    picture: string,
    email: string 
    lastname: string,
    birthday: string,
    userType: UserType
}