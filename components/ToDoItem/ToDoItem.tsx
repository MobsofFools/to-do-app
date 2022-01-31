import Box from "@mui/material/Box";
import { useState } from "react";
import { TodoItem } from "../../common/types";
import { Timestamp } from "@firebase/firestore";
import Collapse from "@mui/material/Collapse";
import ClickAwayListener from "@mui/base/ClickAwayListener";

type TodoItemProps = {
  todoItem: TodoItem;
};
const ToDoItem = (props: TodoItemProps) => {
  const { title, description, location, complete, deadline } = props.todoItem;
  const [open, setOpen] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleClickAway = () => {
    setOpen(false);
  };
  function isTimestamp(object:any): object is Timestamp {
    return (object as Timestamp).toDate !== undefined;
  }
  const deadlineToString = (ddeadline:any) => {
    const checkStamp = isTimestamp(ddeadline);
    if(checkStamp)
    {
      return ddeadline.toDate().toString();
    }
    return ddeadline;
  }
  
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box
        sx={{ border:"1px solid rgba(90,90,90,0.25)", minWidth: "50vw",boxShadow: "rgba(99, 99, 99, 0.2) 0px 4px 8px 0px" }}
        borderRadius={"0.5rem"}
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
              <div>{description}</div>
            </div>
            <div>
              <div>{location}</div>
            </div>
          </div>
          <div>{deadlineToString(deadline)}</div>
        </Collapse>
        {complete ? <div>Done</div> : <div>Not done</div>}
      </Box>
    </ClickAwayListener>
  );
};
export default ToDoItem;
