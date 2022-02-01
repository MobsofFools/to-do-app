import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, ChangeEvent, useEffect } from "react";
import { ITodoItem, AlertProps } from "../../common/types";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { getTodoItem, updateToDoItem } from "../../common/calls";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { deadlineToString } from "../../common/utils";
import Head from "next/head";

const TodoItemPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentToDoItem, setCurrentToDoItem] = useState<ITodoItem>({
    title: "",
    description: "",
    priority: 0,
  });

  const [alert, setAlert] = useState<AlertProps>({
    severity: undefined,
    open: false,
    message: "",
  });
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert((prev) => ({ ...prev, open: false }));
  };
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
  const onToDoPriorityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentToDoItem((prev) => ({
      ...prev,
      priority: Number.parseInt(e.target.value),
    }));
  };

  const getToDoItemData = async () => {
    if (id && typeof id === "string") {
      const data = await getTodoItem(id);
      if (data) {
        const timestamp = deadlineToString(data.deadline);
        if (timestamp) {
          data.deadline = timestamp;
        }
        setCurrentToDoItem(data);
      }
    }
  };
  const handleUpdate = () => {
    if (id && typeof id === "string") {
      updateToDoItem(id, currentToDoItem)
        .then(() => {
          setAlert({
            open: true,
            severity: "success",
            message: "Successfully updated the item!",
          });
        })
        .catch((err) => {
          setAlert({
            open: true,
            severity: "error",
            message: "An error has occured while updating your item",
          });
        });
    }
  };
  useEffect(() => {
    getToDoItemData();
    console.log("fetch");
  }, [id]);
  return (
    <Container>
        <Head>
            <title>To Do: {currentToDoItem.title}</title>
        </Head>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          sx={{ p: "1rem" }}
          label="Title"
          required
          InputLabelProps={{
            shrink: true,
          }}
          value={currentToDoItem.title}
          onChange={onToDoTitleChange}
        />

        <TextField
          sx={{ p: "1rem" }}
          label="Description"
          multiline
          minRows={2}
          required
          InputLabelProps={{
            shrink: true,
          }}
          value={currentToDoItem.description}
          onChange={onToDoDescriptionChange}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            sx={{ p: "1rem" }}
            label="Deadline"
            InputLabelProps={{
              shrink: true,
            }}
            type="datetime-local"
            value={currentToDoItem.deadline}
            onChange={onToDoDeadlineChange}
          />
          <TextField
            select
            sx={{ p: "1rem" }}
            value={currentToDoItem.priority}
            label="Priority"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onToDoPriorityChange}
          >
            <MenuItem value={0}>None</MenuItem>
            <MenuItem value={1}>Low</MenuItem>
            <MenuItem value={2}>Medium</MenuItem>
            <MenuItem value={3}>High</MenuItem>
          </TextField>
        </div>
        <TextField
          sx={{ p: "1rem" }}
          label="Location"
          InputLabelProps={{
            shrink: true,
          }}
          value={currentToDoItem.location}
          onChange={onToDoLocationChange}
        />

        <br />
        <Button sx={{ mx: "1rem" }} variant="outlined" onClick={handleUpdate}>
          Update
        </Button>
      </Box>
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
    </Container>
  );
};
export default TodoItemPage;
