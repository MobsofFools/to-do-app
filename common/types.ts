import { Timestamp } from "@firebase/firestore"
import {AlertColor} from '@mui/material/Alert'
export function isTimestamp(object: any): object is Timestamp {
    return (object as Timestamp).toDate !== undefined;
  }
export enum PriorityEnum {
    None = 0,
    Low = 1,
    Medium = 2,
    High = 3
}
export type ITodoItem = {
    title:string,
    description:string,
    deadline?:string|Timestamp|Date,
    location?:string,
    priority?:number,
    id?:string,
    uid?:string,
    completedAt?:Timestamp,
}

export type ICreatedUser = {
    email:string,
    fname:string,
    lname:string
}
export type AlertProps = {
    open:boolean;
    severity:undefined | AlertColor;
    message:string;
}