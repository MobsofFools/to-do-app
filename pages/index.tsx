import type { NextPage } from "next";
import Head from "next/head";
import { auth } from "../db/firebase-config";

import { ITodoItem } from "../common/types";
import { useState, useEffect } from "react";
import {
  getOrderedTodosByDeadline,
  getOrderedTodosByPrio,
} from "../common/calls";
import ToDoItem from "../components/ToDoItem/ToDoItem";
import Skeleton from '@mui/material/Skeleton'
import Container from "@mui/material/Container";
import ToDoSkeleton from "../components/Skeleton/ToDoSkeleton";
import { useAuthContext } from "../common/context";

const Home: NextPage = () => {

  const [nearDeadline, setNearDeadline] = useState<ITodoItem[]>();
  const [topPrio, setTopPrio] = useState<ITodoItem[]>();
  const user = useAuthContext();
  const getNearDeadLine = async () => {
    const data = await getOrderedTodosByDeadline();
    setNearDeadline(data);
  };
  const getTopPrio = async () => {
    const data = await getOrderedTodosByPrio();
    setTopPrio(data);
  };
  const getData = () => {
    getNearDeadLine();
    getTopPrio();
  };
  useEffect(() => {
    if(user)
    {
      setTimeout(getData, 1000);
    }
    
  }, []);

  return (
    <Container>
      {user?
            <>
            <Head>
              <title>Home</title>
            </Head>
            <div>
              <h1>Past Deadline</h1>
            </div>
            <div>
              <h1>High Priority Actions</h1>
              {topPrio
                ? topPrio.map((item) => {
                    return <ToDoItem key={item.id} todoItem={item}></ToDoItem>;
                  })
                : <ToDoSkeleton height={55} num={3}/>}
            </div>
            <div>
              <h1>Upcoming Deadlines</h1>
              {nearDeadline?
              nearDeadline.map((item) => {
                return <ToDoItem key={item.id} todoItem={item}></ToDoItem>;
              })
              :
              <ToDoSkeleton height={55} num={3}/>
            }
            </div>
            </>
            :
            <h1>Please log in</h1>
      }

    </Container>
  );
};

export default Home;
