import { NextPage } from "next";
import { auth } from "../../db/firebase-config";
import { useState, ChangeEvent, useEffect } from "react";
import { addDoc, getDocs, collection, query, where } from "@firebase/firestore";
import { db } from "../../db/firebase-config";
import { todoItemConverter } from "../../db/converters";
import { TodoItem } from "../../common/types";
import ToDoItem from "../../components/ToDoItem/ToDoItem";
import { Container } from "@mui/material";

const ToDosMainPage: NextPage = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodoItem, setNewToDoItem] = useState<TodoItem>({
    title: "",
    description: "",
    deadline: "",
    location: "",
  });
  const getUserToDos = async () => {
    const uid = auth.currentUser?.uid;
    if (uid) {
      const q = query(collection(db, "todos"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      var tempArray: any[] = [];
      querySnapshot.forEach((doc) => {
        tempArray.push(doc.data());
      });
      setTodos(tempArray);
    }
  };
  const createToDoItem = async () => {
    const uid = auth.currentUser?.uid;
    const todoRef = collection(db, "todos").withConverter(todoItemConverter);
    if (uid) {
      const set = await addDoc(todoRef, {
        uid: uid,
        title: newTodoItem.title,
        description: newTodoItem.description,
        deadline: newTodoItem.deadline,
        location: newTodoItem.location,
        complete: false,
      }).then((res) =>
        setNewToDoItem({
          title: "",
          description: "",
          deadline: "",
          location: "",
        })
      );
    }
  };
  const onToDoTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewToDoItem((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };
  const onToDoDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewToDoItem((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };
  const onToDoDeadlineChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewToDoItem((prev) => ({
      ...prev,
      deadline: e.target.value,
    }));
  };
  const onToDoLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewToDoItem((prev) => ({
      ...prev,
      location: e.target.value,
    }));
  };
  useEffect(() => {
    console.log(todos);
  }, [todos]);
  useEffect(() => {
      setTimeout(getUserToDos,1000);
  }, []);
  return (
    <Container>
      <div style={{ border: "1px solid black" }}>
        <p>Title</p>
        <input value={newTodoItem.title} onChange={onToDoTitleChange}></input>
        <p>Description</p>
        <input
          value={newTodoItem.description}
          onChange={onToDoDescriptionChange}
        ></input>
        <p>Deadline?</p>
        <input
          type="datetime-local"
          value={newTodoItem.deadline}
          onChange={onToDoDeadlineChange}
        ></input>
        <p>Location</p>
        <input
          value={newTodoItem.location}
          onChange={onToDoLocationChange}
        ></input>
        <br />
        <button onClick={createToDoItem}>Create</button>
        <button onClick={getUserToDos}>Get</button>
      </div>
      <div>
          {todos.map((item)=> {
              return(
                  
                  <ToDoItem
                    key={item.uid+item.title}
                    todoItem={item}
                  />
                  
              );
          })}
      </div>
    </Container>
  );
};
export default ToDosMainPage;
