import { Alert, Slider, Snackbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { LeftPannel } from "./LeftPannel";
import { RightPannel } from "./RightPannel";
import "./Style.scss";

function App() {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerLevel, setNewPlayerLevel] = useState(5);

  const [openSnackBarError, setOpenSnackbarError] = useState(false);
  const [snackBarErrorMessage, setSnackbarErrorMessage] = useState("");

  const [updateUserList, setUpdateUserList] = useState(false);
  const [userList, setUserList] = useState(
    Array<{ id: string; name: string; level: number }>()
  );

  useEffect(() => {
    setUpdateUserList(true);
  }, []);

  useEffect(() => {
    if (updateUserList) {
      axios
        .get("http://localhost:5001/user")
        .then((response) => {
          setUserList(response.data);
        })
        .catch((error) => {
          setOpenSnackbarError(true);
          setSnackbarErrorMessage(error.response.data.message);
        });
      setUpdateUserList(false);
    }
  }, [updateUserList]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="LeftContainer">
          <LeftPannel
            userList={userList}
            setUpdateUserList={setUpdateUserList}
            setOpenSnackbarError={setOpenSnackbarError}
            setSnackbarErrorMessage={setSnackbarErrorMessage}
          />
        </div>
        <div className="Right-Container">
          <RightPannel
            userList={userList}
            setOpenSnackbarError={setOpenSnackbarError}
            setSnackbarErrorMessage={setSnackbarErrorMessage}
          />
        </div>
        <Snackbar
          open={openSnackBarError}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbarError(false)}
        >
          <Alert severity="error">{snackBarErrorMessage}</Alert>
        </Snackbar>
      </header>
    </div>
  );
}

export default App;
