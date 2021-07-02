import "./styles.css";
import { useState, forwardRef } from "react";
import {
  Slide,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Paper
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import FlipMove from "react-flip-move";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function App() {
  const [temp, setTemp] = useState("");
  const [task, setTask] = useState([]);
  const [error, setError] = useState(false);
  const [helper, setHelper] = useState("");
  const [dial, setDial] = useState(false);

  const add = (e) => {
    e.preventDefault();
    if (temp.length !== 0) {
      const obj = {
        id: new Date().getTime(),
        todo: temp
      };
      setTask([...task, obj]);
      setTemp("");
    } else {
      setError(true);
      setHelper("Please type something");
    }
  };

  const remove = (id) => {
    const newArr = task.filter((x) => {
      return x.id !== id;
    });
    setTask(newArr);
  };

  const display = (x) => {
    return (
      <div className="item" style={{ marginTop: 10 }} key={x.id}>
        <Paper
          className="item-paper"
          elevation={3}
          style={{
            padding: 15,
            minWidth: 190,
            backgroundColor: "#32a692",
            textAlign: "left"
          }}
        >
          {x.todo}
          <span style={{ float: "right", marginTop: -12 }}>
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

  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="input-section">
        <form onSubmit={add}>
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
          <Button
            variant="contained"
            color="primary"
            style={{ padding: 15, marginLeft: 5 }}
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
        </form>
      </div>

      <Paper
        className="container"
        elevation={3}
        style={{
          backgroundColor: "gray",
          minWidth: 230,
          height: "90vh",
          margin: 10,
          marginLeft: 20,
          marginRight: 20
        }}
      >
        <FlipMove
          className="display-section"
          style={{
            height: 890,
            marginTop: 5,
            padding: 20
          }}
          duration={150}
          easing="ease-out"
        >
          {task.map((x) => {
            return display(x);
          })}
        </FlipMove>
      </Paper>
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
              setDial(false);
            }}
          >
            clear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
