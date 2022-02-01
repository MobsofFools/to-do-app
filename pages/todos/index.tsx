import { NextPage } from "next";
import Head from "next/head";
import React, { useState, ChangeEvent, useEffect } from "react";
import { auth, db } from "../../db/firebase-config";
import { addDoc, getDocs, collection, query, where } from "@firebase/firestore";
import { todoItemConverter } from "../../db/converters";

import { ITodoItem } from "../../common/types";
import { dateStringToTimestamp, useWindowDimensions } from "../../common/utils";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ToDoItem from "../../components/ToDoItem/ToDoItem";
import MenuItem from "@mui/material/MenuItem";
import AddTaskIcon from '@mui/icons-material/AddTask';


const ToDosMainPage: NextPage = () => {
  const { width } = useWindowDimensions();
  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [newTodoItem, setNewToDoItem] = useState<ITodoItem>({
    title: "",
    description: "",
    deadline: "",
    location: "",
    priority: 0,
  });
  const [showToDoMenu, setShowToDoMenu] = useState(false);

  const getUserToDos = async () => {
    const uid = auth.currentUser?.uid;
    if (uid) {
      const q = query(
        collection(db, "todos").withConverter(todoItemConverter),
        where("uid", "==", uid)
      );
      const data = await getDocs(q);
      const dataArray = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTodos(dataArray);
    }
  };
  const createToDoItem = async () => {
    const uid = auth.currentUser?.uid;
    const todoRef = collection(db, "todos").withConverter(todoItemConverter);
    if (uid) {
      if (typeof newTodoItem.deadline === "string") {
        var deadline = dateStringToTimestamp(newTodoItem.deadline);
        const set = await addDoc(todoRef, {
          uid: uid,
          title: newTodoItem.title,
          description: newTodoItem.description,
          deadline: deadline,
          location: newTodoItem.location,
          complete: false,
          priority: newTodoItem.priority,
        }).then((res) => {
          setNewToDoItem({
            title: "",
            description: "",
            deadline: "",
            location: "",
            priority: 0,
          });
          setTimeout(getUserToDos, 1000);
          setShowToDoMenu(false);
        });
      }
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
  const onToDoPriorityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewToDoItem((prev) => ({
      ...prev,
      priority: Number.parseInt(e.target.value),
    }));
  };

  useEffect(() => {
    setTimeout(getUserToDos, 1000);
  }, []);
  const TodoForm = (
    <>
      <TextField
        sx={{ p: "1rem" }}
        label="Title"
        required
        InputLabelProps={{
          shrink: true,
        }}
        value={newTodoItem.title}
        onChange={onToDoTitleChange}
      />

      <TextField
        sx={{ p: "1rem" }}
        label="Description"
        multiline
        minRows={2}
        required
        InputLabelProps={{
          shrink: true,
        }}
        value={newTodoItem.description}
        onChange={onToDoDescriptionChange}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          sx={{ p: "1rem" }}
          label="Deadline"
          InputLabelProps={{
            shrink: true,
          }}
          type="datetime-local"
          value={newTodoItem.deadline}
          onChange={onToDoDeadlineChange}
        />
        <TextField
          select
          sx={{ p: "1rem" }}
          value={newTodoItem.priority}
          label="Priority"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onToDoPriorityChange}
        >
          <MenuItem value={0}>None</MenuItem>
          <MenuItem value={1}>Low</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>High</MenuItem>
        </TextField>
      </div>
      <TextField
        sx={{ p: "1rem" }}
        label="Location"
        InputLabelProps={{
          shrink: true,
        }}
        value={newTodoItem.location}
        onChange={onToDoLocationChange}
      />

      <br />
      <Button sx={{ mx: "1rem" }} variant="outlined" onClick={createToDoItem}>
        Create
      </Button>
    </>
  );
  return (
    <Container sx={{ width: "100%", paddingY: "1rem" }}>
        <Head><title>To Do List</title></Head>
        <h1>To Do List</h1>
        


      {typeof width !== "undefined" && width < 768 ? (
        <>      <Fab
        color="primary"
        sx={{bgcolor:"hsla(180, 70%, 40%, 1)", position:'fixed', bottom:"1rem", right:"1rem"}}
        size="large"
        onClick={() => setShowToDoMenu(!showToDoMenu)}
      >
          <AddTaskIcon></AddTaskIcon>
      </Fab>
        <SwipeableDrawer
          anchor={"right"}
          open={showToDoMenu}
          onOpen={() => console.log("open")}
          onClose={() => setShowToDoMenu(false)}
        >
          <div
            style={{
              minWidth: "90vw",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {TodoForm}
          </div>
        </SwipeableDrawer>
        </>
      ) : (
          <>
          <Fab
        color="primary"
        sx={{bgcolor:"hsla(180, 70%, 40%, 1)", position:'fixed', top:"3rem", right:"3rem"}}
        size="large"
        onClick={() => setShowToDoMenu(!showToDoMenu)}
      >
          <AddTaskIcon></AddTaskIcon>
      </Fab>
        <SwipeableDrawer
          anchor={"right"}
          open={showToDoMenu}
          onOpen={() => console.log("open")}
          onClose={() => setShowToDoMenu(false)}
        >
          <div
            style={{
              minWidth: "50vw",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {TodoForm}
          </div>
        </SwipeableDrawer>
        </>
      )}
      <div style={{overflowY:"auto", height:"80vh"}} >
        {todos.map((item, i) => {
          return <ToDoItem key={item.id + item.title + i} todoItem={item} />;
        })}
      </div>
    </Container>
  );
};
export default ToDosMainPage;
