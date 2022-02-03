import { NextPage } from "next";
import Head from "next/head";
import { useState, useEffect } from "react";
import { auth, db } from "../../db/firebase-config";
import {  getDocs, collection, query, where } from "@firebase/firestore";
import { completedTodoItemConverter } from "../../db/converters";

import { ITodoItem } from "../../common/types";
import Container from "@mui/material/Container";
import ToDoItem from "../../components/ToDoItem/ToDoItem";
import ToDoSkeleton from "../../components/Skeleton/ToDoSkeleton";

const CompletedPage: NextPage = () => {
  const [todos, setTodos] = useState<ITodoItem[]>();


  const getUserToDos = async () => {
    const uid = auth.currentUser?.uid;
    if (uid) {
      const q = query(
        collection(db, "completedtodos").withConverter(completedTodoItemConverter),
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
  
  useEffect(() => {
    setTimeout(getUserToDos, 500);
  }, []);

  return (
    <Container sx={{ width: "100%", paddingY: "1rem" }}>
      <Head>
        <title>Completed Tasks</title>
      </Head>
      <h1>Completed Tasks</h1>
      <div style={{ overflowY: "auto", height: "80vh" }}>
        {todos?
        todos.map((item, i) => {
          return <ToDoItem key={item.id + item.title + i} todoItem={item} completed/>;
        })
        :
        <ToDoSkeleton num={10} height={55}/>
    }
      </div>
    </Container>
  );
};
export default CompletedPage;