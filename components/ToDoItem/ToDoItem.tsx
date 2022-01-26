import Box from "@mui/material/Box";
import { TodoItem } from "../../common/types";

type TodoItemProps = {
  todoItem: TodoItem;
};
const ToDoItem = (props: TodoItemProps) => {
  const { title, description, location, complete, deadline } = props.todoItem;
  return (
    <Box sx={{border:"1px solid black"}} bgcolor={"#63839c"} borderRadius={"1rem"} px={"1rem"} py={"0.5rem"} margin={"0.5rem"}>
      <div style={{fontSize:"1.2rem", fontWeight:"bold"}}>{title}</div>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <div>{description}!</div>
        <div>{location}</div>
      </div>
      <div>{deadline}</div>
      {complete ? <div>Done</div> : <div>Not done</div>}
    </Box>
  );
};
export default ToDoItem;
