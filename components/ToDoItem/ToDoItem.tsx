import Box from "@mui/material/Box";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PriorityEnum, ITodoItem, AlertProps } from "../../common/types";
import { deadlineToDate } from "../../common/utils";
import Collapse from "@mui/material/Collapse";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CheckIcon from "@mui/icons-material/Check";
import { deleteToDoItem, moveToCompletedArchive } from "../../common/calls";

type TodoItemProps = {
  todoItem: ITodoItem;
  completed?: boolean;
};
const ToDoItem = (props: TodoItemProps) => {
  const { title, description, location, deadline, id, priority, completedAt } =
    props.todoItem;
  const { completed } = props;
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
  const handleComplete = (id: string | undefined) => {
    moveToCompletedArchive(id)
      .then(() => {
        setAlert({
          open: true,
          severity: "success",
          message: "Item Completed!",
        });
        setDeleted(true);
      })
      .catch((err) => {
        setAlert({
          open: true,
          severity: "error",
          message: "An error has occured",
        });
      });
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
    switch (priority) {
      case 1:
        color = "hsla(45, 100%, 75%,0.3)";
        break;
      case 2:
        color = "hsl(25, 100%, 75%,0.3)";
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight:"3rem"
            }}
          >
              <b>{title}</b>

            {completed ? null : (
              <IconButton onClick={() => handleComplete(id)}>
                <CheckIcon />
              </IconButton>
            )}
          </div>

          <Collapse in={open}>
            <div style={{ paddingBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize:"14px",fontWeight:"bold"}}>
                <div>Details:</div>
                <div>
                    Priority: {priorityToString()}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(240,243,246,0.4)",
                  padding: "0.5rem",
                  minHeight: "4rem",
                  borderRadius: "0.5rem",
                }}
              >
                {description}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize:14, fontWeight:"bold" }}>
              {deadline ? <div>Deadline:</div> : null}
              {location ? <div>Location:</div> : null}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom:"1rem"}}>
              <div>{deadlineToDate(deadline)?.toString()}</div>
              <div>{location}</div>
            </div>

            {completed ? <div><div style={{fontSize:14, fontWeight:"bold" }}>Completed at: </div>{deadlineToDate(completedAt)?.toString()}</div> : (
              <div style={{ textAlign: "right" }}>
                <IconButton>
                  <Link href={redirectLink} passHref>
                    <EditIcon fontSize="small" />
                  </Link>
                </IconButton>
                <IconButton onClick={() => handleDelete(id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </div>
            )}
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
