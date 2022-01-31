import { others } from "@chakra-ui/react"
import { db } from "../db/firebase-config"
import {doc, getDoc} from 'firebase/firestore';
import { todoItemConverter } from "../db/converters";

export const getTodoItem = async(documentId:string) => {
    const docRef = doc(db,"todos",documentId).withConverter(todoItemConverter);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
        const item = docSnap.data()
        return item;
    }
    else{
        console.log("no item")
    }

}