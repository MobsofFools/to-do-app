import Box from "@mui/material/Box";
import Link from "next/link";
import { useState } from "react";
import { PriorityEnum, ITodoItem, AlertProps } from "../../common/types";
import { deadlineToDate } from "../../common/utils";
import Collapse from "@mui/material/Collapse";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { deleteToDoItem } from "../../common/calls";

type TodoItemProps = {
  todoItem: ITodoItem;
};
const ToDoItem = (props: TodoItemProps) => {
  const { title, description, location, complete, deadline, id, priority } =
    props.todoItem;
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [alert, setAlert] = useState<AlertProps>({
    severity: undefined,
    open: false,
    message: "",
  });
  const handleClickAway = () => {
    setOpen(false);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert((prev) => ({ ...prev, open: false }));
  };

  const handleDelete = (id: string | undefined) => {
    if (typeof id === "string") {
      deleteToDoItem(id)
        .then(() => {
          setAlert({
            open: true,
            severity: "success",
            message: "Successfully deleted the item!",
          });
          setDeleted(true);
        })
        .catch((err) => {
          setAlert({
            open: true,
            severity: "error",
            message: "An error has occured while deleting your item",
          });
        });
    }
  };
  const redirectLink = `/todos/${id}`;
  const bgcolor = () => {
    var color = "";
    if (complete) {
      color = "hsla(120, 100%, 67%,0.3)";
      return color;
    }
    switch (priority) {
      case 1:
        color = "hsla(59, 100%, 75%,0.3)";
        break;
      case 2:
        color = "hsl(41, 100%, 75%,0.3)";
        break;
      case 3:
        color = "hsl(0, 100%, 50%,0.3)";
        break;
      default:
        color = "white";
    }
    return color;
  };
  const priorityToString = () => {
    if (typeof priority === "number") {
      const prio = PriorityEnum[priority];
      return prio;
    }
  };
  if (deleted) {
    return (
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    );
  }
  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box
          sx={{
            border: "1px solid rgba(90,90,90,0.25)",
            minWidth: "50vw",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 4px 8px 0px",
          }}
          borderRadius={"0.5rem"}
          bgcolor={bgcolor}
          px={"1rem"}
          py={"0.5rem"}
          margin={"0.5rem"}
          onClick={() => setOpen(true)}
        >
          <div
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div>{title}</div>
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
            <div>
              <div>{deadlineToDate(deadline)?.toString()}</div>
              <div>{priorityToString()}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <IconButton>
                <Link href={redirectLink}>
                  <EditIcon fontSize="small" />
                </Link>
              </IconButton>
              <IconButton onClick={() => handleDelete(id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </Collapse>
        </Box>
      </ClickAwayListener>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};
export default ToDoItem;
