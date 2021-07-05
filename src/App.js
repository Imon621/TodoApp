import "./styles.css";
import { useState, useEffect, forwardRef } from "react";
import {
  Slide,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
  TextField,
  Button,
  IconButton,
  Grid,
  Paper
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import yellow from "@material-ui/core/colors/yellow";
import FlipMove from "react-flip-move";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function App() {
  //datas
  const [temp, setTemp] = useState("");
  const [task, setTask] = useState([]);
  const [error, setError] = useState(false);
  const [helper, setHelper] = useState("");
  const [dial, setDial] = useState(false);
  const [edit, setEdit] = useState({ dialouge: false, id: null, text: "" });

  //add function
  const add = (e) => {
    e.preventDefault();
    if (temp.length !== 0) {
      const obj = {
        id: new Date().getTime(),
        todo: temp
      };
      setTask([...task, obj]);
      setTemp("");
      localStorage.setItem("data", task);
    } else {
      setError(true);
      setHelper("Please type something");
    }
  };
  // edit function
  const Edit = (id) => {
    const arr = task.map((x) => {
      if (x.id === id) {
        return { id: x.id, todo: edit.text };
      } else {
        return x;
      }
    });
    setTask(arr);
    localStorage.setItem("data", task);
  };
  //remove function
  const remove = (id) => {
    const newArr = task.filter((x) => {
      return x.id !== id;
    });
    setTask(newArr);
    localStorage.setItem("data", task);
  };

  //lists
  const display = (x) => {
    return (
      <div className="item" style={{ marginTop: 10 }} key={x.id}>
        <Paper
          className="item-paper"
          elevation={3}
          style={{
            padding: 15,
            minWidth: 150,
            backgroundColor: "#32a692",
            textAlign: "left"
          }}
        >
          {x.todo}
          <span style={{ float: "right", marginTop: -12 }}>
            <IconButton
              style={{ padding: 10, color: yellow[600], borderRadius: 12 }}
              variant="contained"
              onClick={() => {
                setEdit({ dialouge: true, text: x.todo, id: x.id });
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              style={{ padding: 10, borderRadius: 12 }}
              variant="contained"
              color="secondary"
              onClick={() => {
                remove(x.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </span>
        </Paper>
      </div>
    );
  };

  //main app
  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* upper section */}
      <div className="input-section">
        <form onSubmit={add}>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={12}>
              {/* Logo */}
              <h1 style={{ fontFamily: "cursive", color: "#32a692" }}>
                Todo App
              </h1>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                placeholder="Type Here"
                variant="outlined"
                color="primary"
                value={temp}
                error={error}
                helperText={helper}
                onChange={(e) => {
                  error ? setError(false) : setError(false);
                  setHelper("");
                  setTemp(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: 15 }}
                onClick={add}
              >
                Add
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ padding: 15, marginLeft: 5 }}
                onClick={() => {
                  setDial(true);
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* upper section ends here */}
      {/* display section */}
      <Grid container spaicng={3} alignItems="center" justify="center">
        <Grid item xs={10} md={6} lg={4}>
          <Paper
            className="container"
            elevation={3}
            style={{
              backgroundColor: "gray"
            }}
          >
            <FlipMove
              className="display-section"
              style={{
                height: "73vh",
                marginTop: 5,
                overflow: "auto",
                padding: 10
              }}
              duration={150}
              easing="ease-out"
            >
              {task.map((x) => {
                return display(x);
              })}
            </FlipMove>
          </Paper>
        </Grid>
      </Grid>
      {/* display section ends here */}
      {/* Modal/dialogue */}
      <Dialog
        open={dial}
        onClose={() => {
          setDial(false);
        }}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Do you want to clear all Todo list?
        </DialogTitle>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              setDial(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              setTask([]);
              setTemp([]);
              localStorage.setItem("data", task);
              setDial(false);
            }}
          >
            clear
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={edit.dialouge}
        onClose={() => {
          setEdit({ dialouge: false, id: null, text: "" });
        }}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
      >
        <DialogTitle id="alert-dialog-slide-title">Edit Here:</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                Edit(edit.id);
                setEdit({ dialouge: false, id: null, text: "" });
              }}
            >
              <TextField
                name="editDial"
                placeholder={edit.text}
                autoFocus
                onChange={(e) =>
                  setEdit({
                    dialouge: edit.dialouge,
                    text: e.target.value,
                    id: edit.id
                  })
                }
              />
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              setEdit({ dialouge: false, id: null, text: "" });
            }}
          >
            Cancel
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              Edit(edit.id);
              setEdit({ dialouge: false, id: null, text: "" });
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
