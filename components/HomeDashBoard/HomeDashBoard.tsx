import { useState, useEffect } from "react";
import { useAuthContext } from "../../common/context";
import { isTimestamp, ITodoItem } from "../../common/types";
import {
  getOrderedTodosByDeadline,
  getOrderedTodosByPrio,
  getPastDeadLine,
} from "../../common/calls";
import ToDoSkeleton from "../../components/Skeleton/ToDoSkeleton";
import ToDoItem from "../../components/ToDoItem/ToDoItem";
import { Timestamp } from "firebase/firestore";
const HomeDashBoard = () => {
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
    };
  }, []);
  return (
    <div>
      {pastDeadline ? (
        <>
          {pastDeadline.length > 0 ? <h1>Past Deadline</h1> : null}

          {pastDeadline.map((item) => {
            return <ToDoItem key={item.id} todoItem={item}></ToDoItem>;
          })}
        </>
      ) : (
        <div style={{ marginTop: "12vh" }}>
          <ToDoSkeleton height={55} num={3} />
        </div>
      )}
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
      {nearDeadline ? (
        <>
          {nearDeadline.length > 0 ? <h1>Upcoming Deadlines</h1> : null}
          {nearDeadline.map((item) => {
            return <ToDoItem key={item.id} todoItem={item}></ToDoItem>;
          })}
        </>
      ) : (
        <ToDoSkeleton height={55} num={3} />
      )}
    </div>
  );
};
export default HomeDashBoard;
