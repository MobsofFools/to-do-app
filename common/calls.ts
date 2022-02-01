import { db, auth } from "../db/firebase-config";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { todoItemConverter } from "../db/converters";
import { ITodoItem } from "./types";
import { dateStringToTimestamp } from "./utils";

export const getTodoItem = async (documentId: string) => {
  const docRef = doc(db, "todos", documentId).withConverter(todoItemConverter);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const item = docSnap.data();
    return item;
  } else {
    console.log("no item");
  }
};
export const getOrderedTodosByDeadline = async () => {
  const uid = auth.currentUser?.uid;
  const q = query(
    collection(db, "todos").withConverter(todoItemConverter),
    where("uid", "==", uid),
    orderBy("deadline", "asc"),
    limit(3)
  );
  const data = await getDocs(q);
  const dataArray = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArray;
};
export const getOrderedTodosByPrio = async () => {
  const uid = auth.currentUser?.uid;
  const q = query(
    collection(db, "todos").withConverter(todoItemConverter),
    where("uid", "==", uid),
    orderBy("priority", "desc"),
    limit(3)
  );
  const data = await getDocs(q);
  const dataArray = data.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return dataArray;
};
export const getPastDeadLine = async () => {
    const uid = auth.currentUser?.uid;
    const q = query(
        collection(db, "todos").withConverter(todoItemConverter),
        where("uid", "==", uid),
        );
}

export const updateToDoItem = async (id: string, item: ITodoItem) => {
  const todoRef = doc(db, "todos", id).withConverter(todoItemConverter);
  var deadline;
  if (typeof item.deadline === "string") {
    deadline = dateStringToTimestamp(item.deadline);
  }
  await updateDoc(todoRef, {
    title: item.title,
    description: item.description,
    deadline: deadline,
    location: item.location,
    complete: item.complete,
    priority: item.priority,
  }).then((resp) => console.log(resp, "1"));
};
export const deleteToDoItem = async (id: string | undefined) => {
  if (typeof id === "string") {
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef);
  }
};
