import { Timestamp } from "@firebase/firestore"
enum Priority {
    Low = 1,
    Medium,
    High
}
export type ITodoItem = {
    title:string,
    description:string,
    deadline?:string | Timestamp | Date,
    location?:string,
    complete?:boolean,
    priority?:Priority,
    id?:string,
    uid?:string,
}
export type IDisplayTodoItem = {
    title:string,
    description:string,
    deadline?:string,
    location?:string,
    complete?:boolean,
    priority?:Priority,
    id?:string,
    uid?:string,
}
export type ICreatedUser = {
    email:string,
    fname:string,
    lname:string
}