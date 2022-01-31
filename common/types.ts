import { Timestamp } from "@firebase/firestore"
export type TodoItem = {
    title:string,
    description:string,
    deadline?:string | Timestamp | Date,
    location?:string,
    complete?:boolean
    uid?:string
}
export type createdUser = {
    email:string,
    fname:string,
    lname:string
}