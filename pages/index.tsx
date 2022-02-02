import type { NextPage } from "next";
import Head from "next/head";

import { isTimestamp, ITodoItem } from "../common/types";
import { useState, useEffect } from "react";
import {
  getOrderedTodosByDeadline,
  getOrderedTodosByPrio,
  getPastDeadLine,
} from "../common/calls";
import ToDoItem from "../components/ToDoItem/ToDoItem";
import Container from "@mui/material/Container";
import ToDoSkeleton from "../components/Skeleton/ToDoSkeleton";
import { useAuthContext } from "../common/context";
import { Timestamp } from "firebase/firestore";

const Home: NextPage = () => {
  const [nearDeadline, setNearDeadline] = useState<ITodoItem[]>();
  const [topPrio, setTopPrio] = useState<ITodoItem[]>();
  const [pastDeadline, setPastDeadline] = useState<ITodoItem[]>();
  const user = useAuthContext();
  const currTime = Timestamp.now();
  const getNearDeadLine = async () => {
    const data = await getOrderedTodosByDeadline();
    setNearDeadline(data);
  };
  const getTopPrio = async () => {
    const data = await getOrderedTodosByPrio();
    setTopPrio(data);
  };
  const getPastDue = async () => {
    const data = await getPastDeadLine();
    setPastDeadline(data);
  };
  const getData = () => {
    getNearDeadLine();
    getTopPrio();
    getPastDue();
  };
  useEffect(() => {
    
    if (user) {
       var timer = setTimeout(getData, 1500);
    }
    return function cleanup() {
      clearTimeout(timer);
    }
  }, []);

  return (
    <Container>
      {user ? (
        <>
          <Head>
            <title>Home</title>
          </Head>
          <div>
            {pastDeadline ? (
              <>
                {pastDeadline.length > 0 ? <h1>Past Deadline</h1> : null}

                {pastDeadline.map((item) => {
                  return <ToDoItem key={item.id} todoItem={item}></ToDoItem>;
                })}
              </>
            ) : (
              <ToDoSkeleton height={55} num={3} />
            )}
          </div>
          <div>
            {topPrio ? (
              <>
                {topPrio.length > 0 ? <h1>High Priority Actions</h1> : null}

                {topPrio.map((item) => {
                  if (isTimestamp(item.deadline)) {
                    if (currTime > item.deadline) {
                      return null;
                    }
                  }
                  if (item.priority === 0) {
                    return null;
                  }

                  return <ToDoItem key={item.id} todoItem={item}></ToDoItem>;
                })}
              </>
            ) : (
              <ToDoSkeleton height={55} num={3} />
            )}
          </div>
          <div>
            <h1>Upcoming Deadlines</h1>
            {nearDeadline ? (
              nearDeadline.map((item) => {
                return <ToDoItem key={item.id} todoItem={item}></ToDoItem>;
              })
            ) : (
              <ToDoSkeleton height={55} num={3} />
            )}
          </div>
        </>
      ) : (
        <h1>Please log in</h1>
      )}
    </Container>
  );
};

export default Home;
