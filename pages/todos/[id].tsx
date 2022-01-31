import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, ChangeEvent, useEffect } from "react";
import { ITodoItem } from "../../common/types";
import { getTodoItem } from "../../common/calls";

const TodoItemPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentToDoItem, setCurrentToDoItem] = useState<ITodoItem>({
    title: "",
    description: "",
  });
  const onToDoTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentToDoItem((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };
  const onToDoDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentToDoItem((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };
  const onToDoDeadlineChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentToDoItem((prev) => ({
      ...prev,
      deadline: e.target.value,
    }));
  };
  const onToDoLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentToDoItem((prev) => ({
      ...prev,
      location: e.target.value,
    }));
  };
  useEffect(() => {
    if (id && typeof id === "string") {
      getTodoItem(id).then((data) =>
        data ? setCurrentToDoItem(data) : console.log("nodata")
      );
    }
    console.log("a");
  }, [id]);
  useEffect(() => {
    console.log(currentToDoItem);
  }, [currentToDoItem]);
  return (
    <div>
      <div>{id}</div>
      <div>{currentToDoItem.title}</div>
      <div>{currentToDoItem.description}</div>

    </div>
  );
};
export default TodoItemPage;
