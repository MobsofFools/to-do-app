import {
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "@firebase/firestore";
import { ITodoItem } from "../common/types";

export const todoItemConverter: FirestoreDataConverter<ITodoItem> = {
  toFirestore(item: WithFieldValue<ITodoItem>): DocumentData {
    return {
      title: item.title,
      description: item.description,
      deadline:item.deadline,
      location:item.location,
      uid:item.uid,
      priority:item.priority,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): ITodoItem {
    const data = snapshot.data(options)!;
    return {
        title: data.title,
        description: data.description,
        deadline:data.deadline,
        location:data.location,
        uid:data.uid,
        priority:data.priority,
    };
  },
};
export const completedTodoItemConverter: FirestoreDataConverter<ITodoItem> = {
  toFirestore(item: WithFieldValue<ITodoItem>): DocumentData {
    return {
      title: item.title,
      description: item.description,
      deadline:item.deadline,
      location:item.location,
      uid:item.uid,
      priority:item.priority,
      completedAt:item.completedAt,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): ITodoItem {
    const data = snapshot.data(options)!;
    return {
        title: data.title,
        description: data.description,
        deadline:data.deadline,
        location:data.location,
        uid:data.uid,
        priority:data.priority,
        completedAt:data.completedAt,
    };
  },
};
