import { Alert, Slider, Snackbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import "./Style.scss";

export function LeftPannel(props: {
  userList: Array<{ id: string; name: string; level: number }>;
  setUpdateUserList: Function;
  setOpenSnackbarError: Function;
  setSnackbarErrorMessage: Function;
}) {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerLevel, setNewPlayerLevel] = useState(5);

  return (
    <>
      <div className="DiplayPlayerContainer">
        {props.userList.map((item) => {
          return (
            <div key={item.id} className="PlayerItem">
              <img src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-HD-Image.png" />
              <div className="Player-Item-Name">{item.name}</div>
              <div className="Player-Item-Level">{`${item.level}/10`}</div>
            </div>
          );
        })}
      </div>
      <div className="CreatePlayerContainer">
        <div>Create new player :</div>
        <div className="newPlayerItem">
          <div>New player name</div>
          <input
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
          ></input>
        </div>
        <div className="newPlayerItem">
          <div>New player level</div>
          <Slider
            style={{ width: "40%" }}
            value={newPlayerLevel}
            defaultValue={5}
            step={1}
            min={1}
            max={10}
            aria-label="Disabled slider"
            valueLabelDisplay="auto"
            onChange={(e) =>
              setNewPlayerLevel(Number((e.target as HTMLInputElement)!.value))
            }
          />
        </div>
        <button
          onClick={() => {
            setNewPlayerLevel(5);
            setNewPlayerName("");
            axios
              .post("http://localhost:5001/user/createNewUser", {
                name: newPlayerName,
                level: newPlayerLevel,
              })
              .then(() => {
                props.setUpdateUserList(true);
              })
              .catch((error) => {
                props.setOpenSnackbarError(true);
                props.setSnackbarErrorMessage(error.response.data.message);
              });
          }}
        >
          Create New Player
        </button>
      </div>
    </>
  );
}
