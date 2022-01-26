import Box from "@mui/material/Box";
import { useState } from "react";
import { TodoItem } from "../../common/types";
import Collapse from "@mui/material/Collapse";
import ClickAwayListener from "@mui/base/ClickAwayListener";

type TodoItemProps = {
  todoItem: TodoItem;
};
const ToDoItem = (props: TodoItemProps) => {
  const { title, description, location, complete, deadline } = props.todoItem;
  const [open, setOpen] = useState(false);
  const handleClickAway = () => {
    setOpen(false);
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{ border: "1px solid black", minWidth: "50vw" }}
        bgcolor={"#63839c"}
        borderRadius={"1rem"}
        px={"1rem"}
        py={"0.5rem"}
        margin={"0.5rem"}
        onClick={() => setOpen(true)}
      >
        <div
          style={{ fontSize: "1.2rem", fontWeight: "bold" }}
          
        >
          {title}
        </div>
        <Collapse in={open}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <p>Description</p>
              <div>{description}</div>
            </div>
            <div>
              <p>Location</p>
              <div>{location}</div>
            </div>
          </div>
          <div>{deadline}</div>
        </Collapse>
        {complete ? <div>Done</div> : <div>Not done</div>}
      </Box>
    </ClickAwayListener>
  );
};
export default ToDoItem;
