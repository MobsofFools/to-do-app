import type { NextPage } from "next";
import Head from "next/head";
import { auth } from "../db/firebase-config";
import { signOut } from "firebase/auth";
import { ITodoItem } from "../common/types";
import { useState, useEffect } from "react";
import { getOrderedTodosByDeadline, getOrderedTodosByPrio } from "../common/calls";
import ToDoItem from "../components/ToDoItem/ToDoItem";
const Home: NextPage = () => {
  const logout = async () => {
    await signOut(auth);
  };
  const [nearDeadline, setNearDeadline] = useState<ITodoItem[]>();
  const [topPrio, setTopPrio] = useState<ITodoItem[]>();
  const getNearDeadLine = async() => {
    const data = await getOrderedTodosByDeadline(); 
    setNearDeadline(data);
  }
  const getTopPrio = async() => {
    const data = await getOrderedTodosByPrio(); 
    setTopPrio(data);
  }
  const getData = () => {
    getNearDeadLine();
    getTopPrio();
  }
  useEffect(()=> {
    setTimeout(getData,1000);
  },[])
  return (
    <div>
      <Head><title>Home</title></Head>
      <div>
        <h1>Upcoming Deadlines</h1>
        {nearDeadline?.map((item)=>{
          return <ToDoItem key={item.id} todoItem={item}></ToDoItem>
        })}
        
      </div>
      <div>
        <h1>High Priority Actions</h1>
        {topPrio?.map((item)=>{
          return <ToDoItem key={item.id} todoItem={item}></ToDoItem>
        })}
      </div>
    </div>
  );
};

export default Home;
