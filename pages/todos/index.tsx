import { NextPage } from "next";
import { auth } from "../../db/firebase-config";
import { useState, ChangeEvent, useEffect } from "react";
import { addDoc, getDocs, collection, query, where } from "@firebase/firestore";
import { db } from "../../db/firebase-config";
import { todoItemConverter } from "../../db/converters";
import { TodoItem } from "../../common/types";
import ToDoItem from "../../components/ToDoItem/ToDoItem";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Button, Container } from "@mui/material";
import { useWindowDimensions } from "../../common/utils";

const ToDosMainPage: NextPage = () => {
  const { width } = useWindowDimensions();
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodoItem, setNewToDoItem] = useState<TodoItem>({
    title: "",
    description: "",
    deadline: "",
    location: "",
  });
  const [showToDoMenu, setShowToDoMenu] = useState(false);
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
      }).then((res) => {
        setNewToDoItem({
          title: "",
          description: "",
          deadline: "",
          location: "",
        });
        setTimeout(getUserToDos, 2000);
        setShowToDoMenu(false);
      });
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
    setTimeout(getUserToDos, 1000);
  }, []);

  return (
    <Container sx={{ width: "100vw", paddingY:"1rem"} }>
      <Button variant="contained" onClick={() => setShowToDoMenu(!showToDoMenu)}>Add New Item</Button>
      {width < 700 ? (
        <SwipeableDrawer
          anchor={"right"}
          open={showToDoMenu}
          onOpen={() => console.log("open")}
          onClose={() => setShowToDoMenu(false)}
        >
          <div style={{ border: "1px solid black", minWidth: "90vw" }}>
            <p>Title</p>
            <input
              value={newTodoItem.title}
              onChange={onToDoTitleChange}
            ></input>
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
        </SwipeableDrawer>
      ) : (
        <SwipeableDrawer
          anchor={"right"}
          open={showToDoMenu}
          onOpen={() => console.log("open")}
          onClose={() => setShowToDoMenu(false)}
        >
          <div style={{ border: "1px solid black", minWidth: "50vw" }}>
            <p>Title</p>
            <input
              value={newTodoItem.title}
              onChange={onToDoTitleChange}
            ></input>
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
        </SwipeableDrawer>
      )}

      <div>
        {todos.map((item) => {
          return <ToDoItem key={item.uid + item.title} todoItem={item} />;
        })}
      </div>
    </Container>
  );
};
export default ToDosMainPage;
