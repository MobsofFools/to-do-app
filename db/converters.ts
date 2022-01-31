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
      complete:item.complete,
      uid:item.uid,
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
        complete:data.complete,
        uid:data.uid,
    };
  },
};
